#!/bin/zsh
# Local illustration generator for Keynote Pro decks (Draw Things CLI, z_image_turbo; nothing leaves the machine).
# Usage: tools/gen-images.sh                  render every image listed below that is missing from assets/
#        tools/gen-images.sh name "prompt" [seed] [WxH]   render one ad-hoc image
# Rules: images are ILLUSTRATIVE only. No text, numbers, charts or diagrams (models garble them): keep those in SVG.
# Output is re-encoded through Pillow to JPEG without EXIF (sips alone keeps metadata).
HERE=${0:A:h}; OUT=$HERE/../assets; CLI=/opt/homebrew/bin/draw-things-cli; MODEL=z_image_turbo_1.0_q8p.ckpt
NEG="text, letters, words, numbers, logo, watermark, signature, people, faces, hands, cluttered, noisy, deformed, blurry, oversaturated"
mkdir -p "$OUT"
gen () { # name prompt seed WxH
  local name=$1 prompt=$2 seed=${3:-7} size=${4:-1024x576} tmp=$(mktemp -t kpimg).png
  [[ -f "$OUT/$name.jpg" ]] && { echo "skip $name"; return; }
  $CLI generate --model $MODEL --prompt "$prompt" --negative-prompt "$NEG" --width ${size%x*} --height ${size#*x} --seed $seed --output "$tmp" >/dev/null 2>&1 \
   && python3 -I - "$tmp" "$OUT/$name.jpg" <<'PY' && echo "done $name" || echo "FAIL $name"
import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB'); w,h=im.size
if w>1600: im=im.resize((1600,round(h*1600/w)),Image.LANCZOS)
im.save(sys.argv[2],'JPEG',quality=84,optimize=True,progressive=True)   # new file: no EXIF carried over
PY
  rm -f "$tmp"
}
if [[ -n $1 ]]; then gen "$@"; exit; fi
STYLE="editorial photograph, natural soft light, shallow depth of field, restrained muted colour, generous negative space, no text"
gen aria-hero   "a slim matte aluminium pocket audio recorder with one small round button, lying on a dark slate surface, soft rim light, product photography, minimal, $STYLE" 11 768x1024
gen aria-market "an empty narrow evening street market with warm string lights and wooden stalls, cinematic, gentle motion blur, $STYLE" 12 1024x576
gen warehouse   "inside a modern logistics warehouse at dawn, long conveyor lines and tall shelving in perspective, cool blue light with a warm gold glow from the doors, no workers, $STYLE" 13 768x1024
gen abstract-teal "abstract soft sculptural forms in deep teal and warm amber, paper-cut layers, calm, minimal, $STYLE" 14 1024x576
