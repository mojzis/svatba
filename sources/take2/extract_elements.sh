#!/usr/bin/env bash
# Take 2: tighter, single-subject crops from invite_front.png.
# Each crop targets ONE clear focal element with minimal neighbour bleed.
#
# Output: images/elements_take2/<name>.png (max 1400px on the long side)

set -euo pipefail

SRC="$(dirname "$0")/../invite_front.png"
OUT="$(dirname "$0")/../../images/elements_take2"
mkdir -p "$OUT"

# Source is 5062x5062.
MAX=1400

# name              W     H     X     Y
crops=(
  "title            2580   950    100      0"
  "bar_trio         2680   950   2370     30"
  "chapel            600  1200   1050    700"
  "bonfire           950   900     30    830"
  "nuns              950   800     20   1700"
  "brides_pair       850  1250     30   2450"
  "couple_embrace    800   900   2700   1500"
  "disco_ball        750   650   3050   1080"
  "wine_table       1400  1050   3600   1430"
  "singer            700   800   1100   3050"
  "groom_face        950  1400   1300   3750"
  "flower_dress     1100  1200   2380   2680"
  "cake             1300  1200   3500   3500"
  "fairy_hearts     1000  1300      0   3050"
  "bottle_flutes   1000  1100    2400   3700"
)

# Pipeline: crop, resize for web, fuzz-match whites to alpha, force remaining
# pixels to pure black so the result can be tinted with CSS `filter`.
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
