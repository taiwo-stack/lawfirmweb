"""Verify every internal link and #anchor in the built site (dist/client).

Usage: python scripts/check-links.py   (run after `npm run build`)
Fails with a non-zero exit code if any link points to a missing page or a missing anchor id.
"""
import html, os, pathlib, re, sys
from urllib.parse import urlsplit, unquote

root = pathlib.Path(__file__).resolve().parent.parent / 'dist' / 'client'
pages = {}
for f in root.rglob('*.html'):
    rel = f.relative_to(root).as_posix()
    path = '/' + rel.removesuffix('index.html').removesuffix('.html')
    pages[path.rstrip('/') or '/'] = f.read_text(encoding='utf-8')

def ids(doc):
    return set(re.findall(r'\sid="([^"]+)"', doc))

base = os.environ.get('BASE_PATH', '/').rstrip('/')  # e.g. /lawfirmweb on github.io previews

def resolve(path):
    if base and path.startswith(base):
        path = path[len(base):] or '/'
    p = unquote(path).rstrip('/') or '/'
    return p if p in pages else None

problems, checked = [], 0
for src, doc in pages.items():
    if 'http-equiv="refresh"' in doc:
        continue  # legacy redirect stubs
    for href in re.findall(r'<a\s[^>]*href="([^"]+)"', doc):
        href = html.unescape(href)
        if href.startswith(('mailto:', 'tel:', 'http://', 'https://')) or (base and href.startswith(base + '/assets/')):
            continue
        checked += 1
        parts = urlsplit(href)
        target = resolve(parts.path) if parts.path else src
        if target is None:
            problems.append(f'{src}: broken link -> {href}')
            continue
        if parts.fragment and parts.fragment not in ids(pages[target]):
            problems.append(f'{src}: missing anchor #{parts.fragment} on {target} ({href})')

print(f'{len(pages)} pages, {checked} internal links checked, {len(problems)} problems')
for p in sorted(set(problems)):
    print('  ' + p)
sys.exit(1 if problems else 0)
