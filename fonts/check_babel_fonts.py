from fontTools.ttLib import TTFont

font = TTFont("BabelStoneHan.ttf")

# Characters we want to check
characters = [
    "𠫔",
    "𠀎",
    "𭤨",
    "𰃮",
    "𢆉"
]

# Get all Unicode characters supported by the font
cmap = font.getBestCmap()

print("Checking BabelStone Han:\n")

for char in characters:
    codepoint = ord(char)

    if codepoint in cmap:
        glyph_name = cmap[codepoint]
        print(f"{char} (U+{codepoint:04X}): FOUND - {glyph_name}")
    else:
        print(f"{char} (U+{codepoint:04X}): NOT FOUND")

font.close()