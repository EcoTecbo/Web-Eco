"""Generate high-resolution favicon PNGs from the Ecotaxi SVG logo.

Outputs:
- public/favicon.ico (multi-resolution: 16, 32, 48)
- public/apple-touch-icon.png (180x180, with dark bg)
- public/android-chrome-192x192.png
- public/android-chrome-512x512.png
- src/app/icon.png (Next.js fallback)
- src/app/apple-icon.png (Next.js convention, 180x180)

Next.js App Router will automatically detect src/app/icon.svg as the
primary favicon (crisp at any resolution via SVG).
"""
import cairosvg
from PIL import Image
from pathlib import Path
import io

PUBLIC = Path('/home/z/my-project/public')
SRC_APP = Path('/home/z/my-project/src/app')
SVG = PUBLIC / 'logo.svg'

def render_at(size: int, bg=None) -> Image.Image:
    kwargs = dict(url=str(SVG), output_width=size, output_height=size)
    if bg:
        kwargs['background_color'] = bg
    png = cairosvg.svg2png(**kwargs)
    return Image.open(io.BytesIO(png)).convert('RGBA')

# 1) favicon.ico — multi-resolution (16, 32, 48)
print("Generating favicon.ico (16, 32, 48)...")
ico_images = [render_at(s) for s in [16, 32, 48]]
ico_images[0].save(
    PUBLIC / 'favicon.ico',
    format='ICO',
    sizes=[(s, s) for s in [16, 32, 48]],
    append_images=ico_images[1:],
)
print(f"  Saved {PUBLIC / 'favicon.ico'}")

# 2) apple-touch-icon.png 180x180
print("Generating apple-touch-icon.png (180x180)...")
apple = render_at(180, bg='#0a0e17')
apple.save(PUBLIC / 'apple-touch-icon.png', 'PNG', optimize=True)
apple.save(SRC_APP / 'apple-icon.png', 'PNG', optimize=True)
print(f"  Saved apple-touch-icon.png + src/app/apple-icon.png")

# 3) android-chrome-192x192.png
print("Generating android-chrome-192x192.png...")
render_at(192, bg='#0a0e17').save(PUBLIC / 'android-chrome-192x192.png', 'PNG', optimize=True)

# 4) android-chrome-512x512.png
print("Generating android-chrome-512x512.png...")
a512 = render_at(512, bg='#0a0e17')
a512.save(PUBLIC / 'android-chrome-512x512.png', 'PNG', optimize=True)

# 5) src/app/icon.png (PNG fallback)
a512.save(SRC_APP / 'icon.png', 'PNG', optimize=True)
print(f"  Saved android-chrome + src/app/icon.png")

print("\n✅ All favicons regenerated from SVG (crisp at any resolution)")
