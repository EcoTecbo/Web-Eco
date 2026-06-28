"""Convert 'Moto envios.jpg' to WebP for use as hero background on /envios page."""
from PIL import Image
from pathlib import Path

SRC = Path('/home/z/my-project/upload/Moto envios.jpg')
DST = Path('/home/z/my-project/public/envios-hero.webp')

img = Image.open(SRC).convert('RGB')
w, h = img.size
print(f"Original size: {w}x{h}")

# Resize to ~1920 wide while keeping aspect ratio, cap height at 1280
target_w = 1920
target_h = 1280
ratio = min(target_w / w, target_h / h)
new_w, new_h = int(w * ratio), int(h * ratio)
img = img.resize((new_w, new_h), Image.LANCZOS)
print(f"Resized to: {new_w}x{new_h}")

img.save(DST, 'WEBP', quality=85, method=6)
print(f"Saved: {DST} ({DST.stat().st_size//1024} KB)")
