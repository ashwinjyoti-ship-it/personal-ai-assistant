#!/usr/bin/env python3
"""Crop black borders from dashboard UI assets and export transparent PNGs."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

STAGING = Path("/Volumes/MiniExternal/Projects/personal-ai-assistant/ui-assets-original")
OUT = Path(__file__).resolve().parent.parent / "public" / "static" / "ui"

# luminance threshold: pixels darker than this are treated as outer border/bg
LUM_THRESHOLD = 50
BG_TRANSPARENT_THRESHOLD = 48

MAPPING = {
    STAGING / "nav-dashboard.png": OUT / "nav-dashboard.png",
    STAGING / "nav-new-chat.png": OUT / "nav-new-chat.png",
    STAGING / "nav-settings.png": OUT / "nav-settings.png",
    STAGING / "nav-skills.png": OUT / "nav-skills.png",
    STAGING / "Dash_3D" / "tile-active-tasks_bee.png": OUT / "tile-active-tasks.png",
    STAGING / "Dash_3D" / "tile-skills_wizard.png": OUT / "tile-skills.png",
    STAGING / "Dash_3D" / "tile-preferences_butler.png": OUT / "tile-preferences.png",
    STAGING / "Dash_3D" / "tile-gmail_postman.png": OUT / "tile-gmail.png",
    STAGING / "Dash_3D" / "tile-documents_librarian.png": OUT / "tile-documents.png",
}


def content_bbox(im: Image.Image, lum_threshold: int = LUM_THRESHOLD) -> tuple[int, int, int, int]:
    rgb = im.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    min_x, min_y, max_x, max_y = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b = px[x, y]
            if max(r, g, b) > lum_threshold:
                found = True
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
    if not found:
        return 0, 0, w - 1, h - 1
    return min_x, min_y, max_x, max_y


def strip_dark_background(im: Image.Image, threshold: int = BG_TRANSPARENT_THRESHOLD) -> Image.Image:
    rgba = im.convert("RGBA")
    w, h = rgba.size
    px = rgba.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if max(r, g, b) <= threshold:
                px[x, y] = (r, g, b, 0)
    return rgba


def process(src: Path, dst: Path) -> None:
    if not src.is_file():
        raise FileNotFoundError(src)
    im = Image.open(src)
    x0, y0, x1, y1 = content_bbox(im)
    cropped = im.crop((x0, y0, x1 + 1, y1 + 1))
    out = strip_dark_background(cropped)
    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst, format="PNG", optimize=True)
    print(f"{src.name} -> {dst.name} ({out.size[0]}x{out.size[1]})")


def main() -> None:
    for src, dst in MAPPING.items():
        process(src, dst)


if __name__ == "__main__":
    main()
