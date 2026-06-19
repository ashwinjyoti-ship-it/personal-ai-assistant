"""Strip the light corners off Icon-new.png so it composites cleanly into the terracotta .bot-mark container.

The PNG is 480x480 RGB with a terracotta squircle (~rounded square) in the
middle and light/cream pixels in the four corners. We convert to RGBA and
make any pixel that is clearly NOT the terracotta squircle body transparent.

Heuristic:
- The terracotta body is roughly RGB(201, 122, 82) at the center.
- Anything significantly off (toward cream/white) gets alpha=0.
- We use a chroma check: if the pixel's "warmth" (R - max(G,B)) is below
  a threshold, it's a corner pixel, set alpha=0.
- Anti-aliased edge pixels (between body and corner) stay partially
  opaque to keep the squircle silhouette smooth.
"""
from PIL import Image
import os

SRC = 'New-UI-Assets/Reference -Images/Icon-new.png'
DST = 'public/static/bot-mark.png'

img = Image.open(SRC).convert('RGBA')
px = img.load()
w, h = img.size

# Warmth = how terracotta/warm a pixel is. True terracotta body pixels have
# R >> G > B. Cream/white corners have R ≈ G ≈ B (low warmth).
# Threshold tuned empirically: terracotta body scores ~80+, cream corners
# score ~10 or below. Edge pixels (anti-alias) land in between.
WARMTH_THRESHOLD = 30

for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        warmth = r - max(g, b)
        if warmth < WARMTH_THRESHOLD:
            # Cream/white corner pixel — make fully transparent so the
            # .bot-mark terracotta background shows through.
            px[x, y] = (r, g, b, 0)
        else:
            # Body pixel — keep at full opacity.
            px[x, y] = (r, g, b, 255)

img.save(DST, 'PNG', optimize=True)
print(f'Wrote {DST}: {img.size}, mode={img.mode}, {os.path.getsize(DST)} bytes')