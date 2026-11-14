import csv
import json
import re

# Input and output files
input_file = "data/dictionary/N5_dictionary_jisho.csv"
output_file = "data/dictionary/vocabulary.json"


def simplify_meaning(original):

    # Find the first numbered meaning.
    match = re.search(r"(?:^|\s)1\.\s*(.*?)(?=\s+\d+\.\s|$)", original)

    if match:
        meaning = match.group(1)
    else:
        # Fall back to the original meaning if no numbered entry exists.
        meaning = original

    # Remove explanatory notes enclosed in curly brackets.
    meaning = re.sub(r"\{.*?\}", "", meaning)

    # Remove any remaining grammatical labels.
    meaning = re.sub(r"\[[^\]]*\]", "", meaning)

    # Remove alternative forms and additional information.
    meaning = meaning.split("|")[0]

    # Take only the first translation.
    meaning = meaning.split(";")[0]

    # Remove unnecessary whitespace.
    meaning = meaning.strip()

    # Capitalise the first letter.
    if meaning:
        meaning = meaning[0].upper() + meaning[1:]

    return meaning


# Store the vocabulary entries.
vocabulary = []

with open(input_file, encoding="utf-8-sig", newline="") as csv_file:

    reader = csv.DictReader(csv_file)

    for row in reader:

        entry = {
            "word": row["Word"],
            "reading": row["Reading"],
            "meaning": simplify_meaning(row["Meaning"]),
            "jlpt": "N5"
        }

        vocabulary.append(entry)


# Write the JSON file.
with open(output_file, "w", encoding="utf-8") as json_file:

    json.dump(
        vocabulary,
        json_file,
        ensure_ascii=False,
        indent=4
    )


print(f"Successfully exported {len(vocabulary)} vocabulary entries.")