"""Convert interurbano + corporativo images to optimized WebP."""
from PIL import Image
from pathlib import Path

UPLOAD = Path("/home/z/my-project/upload")
PUBLIC = Path("/home/z/my-project/public")

IMAGES = [
    # Interurbano
    {"src": UPLOAD / "tramos-largos-tips.png", "dst": PUBLIC / "interurbano-hero.webp", "max_width": 1920, "quality": 82},
    {"src": UPLOAD / "portada turismo.png",    "dst": PUBLIC / "interurbano-turismo.webp", "max_width": 900,  "quality": 85},
    {"src": UPLOAD / "Portada interurbano.png","dst": PUBLIC / "interurbano-card.webp",   "max_width": 900,  "quality": 85},
    # Corporativo
    {"src": UPLOAD / "taxi women.jpg",          "dst": PUBLIC / "corporativo-hero.webp",  "max_width": 1920, "quality": 82},
]


def convert(src: Path, dst: Path, max_width: int, quality: int):
    if not src.exists():
        print(f"  [MISSING] {src}")
        return
    img = Image.open(src).convert("RGB")
    w, h = img.size
    if w > max_width:
        new_h = int(h * max_width / w)
        img = img.resize((max_width, new_h), Image.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    img.save(dst, "WEBP", quality=quality, method=6)
    src_size = src.stat().st_size / 1024
    dst_size = dst.stat().st_size / 1024
    reduction = 100 * (1 - dst_size / src_size)
    print(f"  [OK] {src.name} -> {dst.name}  ({src_size:.0f}KB -> {dst_size:.0f}KB, {reduction:.1f}% smaller)")


def main():
    print("Converting images to WebP...")
    for cfg in IMAGES:
        convert(cfg["src"], cfg["dst"], cfg["max_width"], cfg["quality"])
    print("Done.")


if __name__ == "__main__":
    main()
