"""Check that every sentence from the old WordPress site is represented in the new source.

Usage: python scripts/content-audit.py <legacy pages dir>
Scores each legacy sentence by the best word-overlap with any sentence in src/.
"""
import re, sys, pathlib

legacy_dir = pathlib.Path(sys.argv[1])
root = pathlib.Path(__file__).resolve().parent.parent
STOP = set('a an the and or of to in for on at by with is are as be our we its it this that from their your you all any has have which who into than also such'.split())

def words(s):
    return {w for w in re.findall(r"[a-z]+", s.lower().replace('’', "'")) if w not in STOP and len(w) > 2}

def sentences(text):
    text = re.sub(r'\[IMG[^\]]*\]|^URL:.*$|^#+\s*', ' ', text, flags=re.M)
    parts = re.split(r'(?<=[.!?…])\s+|\n+|•', text)
    return [p.strip(' -') for p in parts if len(words(p)) >= 3]

corpus = []
for f in list((root / 'src').rglob('*.ts')) + list((root / 'src').rglob('*.tsx')):
    if 'routeTree' in f.name:
        continue
    corpus += [words(s) for s in re.split(r'(?<=[.!?])\s+|\n', f.read_text(encoding='utf-8'))]
corpus = [c for c in corpus if c]
bag = set().union(*corpus)

rows = []
for page in sorted(legacy_dir.glob('*.md')):
    for s in sentences(page.read_text(encoding='utf-8')):
        w = words(s)
        best = max(len(w & c) / len(w) for c in corpus)
        vocab = len(w & bag) / len(w)
        rows.append((page.stem, round(best, 2), round(vocab, 2), s))

missing = [r for r in rows if r[1] < 0.6]
print(f'{len(rows)} legacy sentences, {len(rows) - len(missing)} matched (>=60% overlap), {len(missing)} to review\n')
for page, best, vocab, s in missing:
    print(f'[{page}] best={best} vocab={vocab} :: {s[:160]}')
