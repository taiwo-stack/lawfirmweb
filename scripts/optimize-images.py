"""Generate responsive WebP variants for every image in public/images.

Usage: python scripts/optimize-images.py   (requires Pillow; re-run after adding or replacing images)

For /images/foo/bar.jpg it writes /images/foo/bar-480.webp, -960.webp, -1600.webp (never upscaling)
and records widths and intrinsic size in src/content/images.json, which <Img> uses to build srcset.
Originals are kept for Open Graph / JSON-LD, which expect JPEG or PNG.
"""
import json, pathlib
from PIL import Image, ImageOps

root = pathlib.Path(__file__).resolve().parent.parent
pub = root / 'public'
widths = [480, 960, 1600]
special = {'/images/brand/logo.jpg': [120, 240, 360]}  # shown at ~120px wide in the header/footer

manifest = {}
for f in sorted((pub / 'images').rglob('*')):
    if f.suffix.lower() not in {'.jpg', '.jpeg', '.png'} or f.stem.endswith('og'):
        continue
    key = '/' + f.relative_to(pub).as_posix()
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    w0, h0 = im.size
    made = []
    for w in special.get(key, widths):
        w = min(w, w0)
        if w in made:
            continue
        out = f.with_name(f'{f.stem}-{w}.webp')
        im.resize((w, round(h0 * w / w0)), Image.LANCZOS).save(out, 'WEBP', quality=78, method=6)
        made.append(w)
    manifest[key] = {'w': w0, 'h': h0, 'variants': made}

(root / 'src' / 'content' / 'images.json').write_text(json.dumps(manifest, indent=1) + '\n', encoding='utf-8')
print(f'{len(manifest)} images, {sum(len(v["variants"]) for v in manifest.values())} WebP variants')
