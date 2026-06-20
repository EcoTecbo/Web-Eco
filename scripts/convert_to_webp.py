#!/usr/bin/env python3
"""
Convert uploaded JPG/PNG images to webp format to reduce file size.
Also optimizes by resizing if too large.
"""
import os
from PIL import Image, ImageOps

UPLOAD_DIR = "/home/z/my-project/upload"

# Mapping of source files -> webp output paths in /public
CONVERSIONS = [
    {
        "src": "taxi por hora.jpg",
        "dest": "/home/z/my-project/public/por-hora-hero.webp",
        "max_width": 1920,
        "quality": 82,
    },
    {
        "src": "callcenter2.jpg",
        "dest": "/home/z/my-project/public/callcenter-bg.webp",
        "max_width": 1920,
        "quality": 82,
    },
    {
        "src": "taxi vip.jpg",
        "dest": "/home/z/my-project/public/vip-hero.webp",
        "max_width": 1920,
        "quality": 82,
    },
]


def convert(src_path: str, dest_path: str, max_width: int, quality: int) -> None:
    """Open src image, downscale if needed, save as webp."""
    if not os.path.exists(src_path):
        print(f"  [SKIP] Source not found: {src_path}")
        return

    src_size = os.path.getsize(src_path)
    img = Image.open(src_path)
    img = ImageOps.exif_transpose(img)

    if img.mode in ("RGBA", "LA"):
        pass
    elif img.mode != "RGB":
        img = img.convert("RGB")

    if img.width > max_width:
        new_h = int(img.height * (max_width / img.width))
        img = img.resize((max_width, new_h), Image.LANCZOS)

    img.save(dest_path, "WEBP", quality=quality, method=6)

    dest_size = os.path.getsize(dest_path)
    pct = (1 - dest_size / src_size) * 100 if src_size > 0 else 0
    print(
        f"  [OK] {os.path.basename(src_path)} -> {os.path.basename(dest_path)}  "
        f"{src_size//1024}KB -> {dest_size//1024}KB  (-{pct:.1f}%)"
    )


def main() -> None:
    print("Converting images to webp:")
    for conv in CONVERSIONS:
        src_path = os.path.join(UPLOAD_DIR, conv["src"])
        convert(src_path, conv["dest"], conv["max_width"], conv["quality"])
    print("Done.")


if __name__ == "__main__":
    main()
