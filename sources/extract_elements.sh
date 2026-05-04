#!/usr/bin/env bash
# Extract isolated illustration elements from invite_front.png.
# Each crop is thresholded to pure black-on-transparent so it can be
# placed on any background and tinted with CSS `filter`.
#
# Output: images/elements/<name>.png  (max 1200px on the long side)

set -euo pipefail

SRC="$(dirname "$0")/invite_front.png"
OUT="$(dirname "$0")/../images/elements"
mkdir -p "$OUT"

# Long-edge target for the web output (px). Source is 5062x5062.
MAX=1200

# name              W     H     X     Y
crops=(
  "title             3050   810      0     0"
  "chapel            1420  1500    100   720"
  "bar               2734  1316   2328     0"
  "couple            1300  1700   1300  1500"
  "bride_winged      1000  1620      0  2050"
  "guests            2750  1520   2280  1320"
  "singer             900  1100   1100  2700"
  "drummer           1100  1320   1300  3600"
  "cake              2700  2300   2280  2750"
)

# Pipeline:
#   1. crop & resize
#   2. fuzz-match whites (40% tolerance) → transparent
#   3. force the remaining (line) pixels to pure black
# This yields crisp black-on-transparent line art that can be tinted with CSS
# `filter` and placed on any background.
for entry in "${crops[@]}"; do
  read -r name w h x y <<<"$entry"
  echo "→ $name  (${w}x${h}+${x}+${y})"
  magick "$SRC" \
    -crop "${w}x${h}+${x}+${y}" +repage \
    -resize "${MAX}x${MAX}>" \
    -fuzz 40% -transparent white \
    -channel RGB -threshold 50% +channel \
    "$OUT/${name}.png"
done

echo
echo "Done. Files in: $OUT"
ls -lh "$OUT"
