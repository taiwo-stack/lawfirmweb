"""Reverse content audit: is every visible sentence on the site traceable to a source?

Usage: python scripts/provenance-audit.py <legacy pages dir>   (run after `npm run build`)

Sources: the old WordPress pages (scraped) + docs/sources/*.md (documents supplied by the firm).
Every visible text block on every built page is split into sentences and scored by the best
word overlap with any single source sentence:
  SOURCED   >= 0.6   (verbatim or lightly edited)
  REWORDED  0.35-0.6 (condensed/paraphrased; check meaning)
  WRITTEN   < 0.35   (not traceable: wording written for the site; must be reviewed)
Short interface labels (< 4 content words, e.g. "Book a consultation") are reported separately.
"""
import html, pathlib, re, sys
from collections import defaultdict

root = pathlib.Path(__file__).resolve().parent.parent
legacy = pathlib.Path(sys.argv[1])
STOP = set('a an the and or of to in for on at by with is are as be our we its it this that from their your you all any has have which who into than also such was were will can may not no he she his her they them us me my one two'.split())

def words(s):
    return [w for w in re.findall(r"[a-z0-9]+", s.lower().replace('’', "'")) if w not in STOP and len(w) > 1]

def split(text):
    return [p.strip() for p in re.split(r'(?<=[.!?:;])\s+|\n+|•|·', text) if p.strip()]

src_text = '\n'.join(p.read_text(encoding='utf-8') for p in legacy.glob('*.md'))
src_text += '\n' + '\n'.join(p.read_text(encoding='utf-8') for p in (root / 'docs' / 'sources').glob('*.md'))
src_text = re.sub(r'\[IMG[^\]]*\]|^URL:.*$', ' ', src_text, flags=re.M)
sources = [set(words(s)) for s in split(src_text)]
sources = [s for s in sources if s]

def visible_blocks(doc):
    doc = re.sub(r'<(script|style|svg|head)\b.*?</\1>', ' ', doc, flags=re.S | re.I)
    doc = re.sub(r'<(br|/p|/h[1-6]|/li|/div|/a|/span|/dt|/dd|/summary|/address|/button|/label)[^>]*>', '\n', doc, flags=re.I)
    doc = re.sub(r'<[^>]+>', ' ', doc)
    return [re.sub(r'\s+', ' ', html.unescape(b)).strip() for b in doc.split('\n')]

seen = {}
for f in sorted((root / 'dist' / 'client').rglob('*.html')):
    doc = f.read_text(encoding='utf-8')
    if 'http-equiv="refresh"' in doc:
        continue
    page = '/' + f.relative_to(root / 'dist' / 'client').as_posix().removesuffix('index.html')
    for block in visible_blocks(doc):
        for s in split(block):
            if s not in seen:
                seen[s] = page

buckets = defaultdict(list)
for s, page in seen.items():
    w = words(s)
    if len(set(w)) < 4:
        buckets['LABEL'].append((page, s))
        continue
    best = max(len(set(w) & src) / len(set(w)) for src in sources)
    key = 'SOURCED' if best >= 0.6 else 'REWORDED' if best >= 0.35 else 'WRITTEN'
    buckets[key].append((page, s, round(best, 2)))

total = sum(len(v) for k, v in buckets.items() if k != 'LABEL')
print(f"{total} unique sentences: {len(buckets['SOURCED'])} sourced, {len(buckets['REWORDED'])} reworded, {len(buckets['WRITTEN'])} written for the site; {len(buckets['LABEL'])} short labels\n")
for key in ('WRITTEN', 'REWORDED'):
    print(f'== {key}')
    for page, s, score in sorted(buckets[key], key=lambda r: (r[0], r[2])):
        print(f'  {score:.2f}  {page:<45} {s[:150]}')
    print()
if '--labels' in sys.argv:
    print('== LABELS')
    for page, s in sorted(buckets['LABEL']):
        print(f'  {page:<45} {s}')
