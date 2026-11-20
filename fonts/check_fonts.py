# py -m fontTools.subset BabelStoneHan.ttf --unicodes=20AD4,2000E,2D928,300EE,22189 --output-file=special-kanji.woff2 --flavor=woff2 --no-hinting

from fontTools.ttLib import TTFont
from pathlib import Path

font = TTFont("special-kanji.woff2")

cmap = font.getBestCmap()

characters = ["𠫔", "𠀎", "𭤨", "𰃮", "𢆉"]

for char in characters:
    print(char, ord(char) in cmap)

font.close()

print("Font size:", Path("special-kanji.woff2").stat().st_size, "bytes")