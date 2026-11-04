function generateDisplayNumbers(chapters, kanjiList, elementList) {

    // Create maps to store the display numbers.
    const kanjiDisplayNumbers = new Map();
    const elementDisplayNumbers = new Map();

    // Keep counters for kanji and elements.
    let kanjiCount = 0;
    let elementCount = 0;

    // Iterate over every chapter.
    chapters.forEach(chapter => {

        chapter.entries.forEach(entryId => {

            // Find the matching kanji or element.
            const kanji = kanjiList.find(item => item.id === entryId);
            const element = elementList.find(item => item.id === entryId);

            // Update the kanji and element numbers.
            if (kanji) {
                kanjiCount++;
                kanjiDisplayNumbers.set(entryId, kanjiCount);

                if (kanji.same_element) {
                    elementCount++;
                    elementDisplayNumbers.set(entryId, elementCount);
                }

            } else if (element) {
                elementCount++;
                elementDisplayNumbers.set(entryId, elementCount);

            } else {
                console.warn(`Entry not found: ${entryId}`);
            }

        });

    });

    return { kanjiDisplayNumbers, elementDisplayNumbers };
}