from fontTools.ttLib import TTFont
from pathlib import Path

font = TTFont("special-kanji.woff2")

cmap = font.getBestCmap()

characters = ["𠫔", "𠀎", "𭤨", "𰃮", "𢆉"]

for char in characters:
    print(char, ord(char) in cmap)

font.close()

print("Font size:", Path("special-kanji.woff2").stat().st_size, "bytes")