// Find the HTML element where we will display the data.
const chapterExplorer = document.getElementById("chapter-explorer");


// Load all three JSON files.
Promise.all([
    fetch("data/chapters.json").then(response => response.json()),
    fetch("data/kanji.json").then(response => response.json()),
    fetch("data/elements.json").then(response => response.json())
])

// Continue once all three files have loaded.
.then(([chapters, kanjiList, elementList]) => {

    // Clear the loading message.
    chapterExplorer.replaceChildren();


    // Iterate over every chapter.
    chapters.forEach(chapter => {

        // Create a section for this chapter.
        const chapterSection = document.createElement("section");

        // Display the chapter title.
        const heading = document.createElement("h2");
        heading.textContent = chapter.title ?? `Chapter ${chapter.order}`;

        chapterSection.appendChild(heading);

         // Create the buttons grid
        const kanjiGrid = document.createElement("div");
        kanjiGrid.className = "kanji-grid";

        // Go through the kanji IDs listed in this chapter.
        chapter.entries.forEach(entryId => {

            // Find the matching kanji or element record.
            const kanji = kanjiList.find(item => item.id === entryId);
            const element = elementList.find(item => item.id === entryId);

            // Skip IDs that don't exist in either json file
            const entry = kanji || element
            if (!entry) {
                console.warn(`Entry not found: ${entryId}`);
                return;
            }

            // Create buttons, character, ID and keyword labels for buttons
            const button = document.createElement("button");
            button.className = "kanji-button";

            const character = document.createElement("span");
            character.className = "kanji-button-character";
            character.textContent = entry.character;

            const id = document.createElement("span");
            id.className = "kanji-button-id";
            id.textContent = entry.id;

            const keyword = document.createElement("span");
            keyword.className = "kanji-button-keyword";
            keyword.textContent = kanji ? kanji.keyword : entry.name;

            button.appendChild(character);
            button.appendChild(id);
            button.appendChild(keyword);

            button.addEventListener("click", () => {
                if (kanji) {
                    window.location.href = `kanji.html?id=${entry.id}`;
                } else {
                    window.location.href = `element.html?id=${entry.id}`
                }
            });

            kanjiGrid.appendChild(button)


        });

        //Add the button kanjiGrid to the chapterSection
        chapterSection.appendChild(kanjiGrid)

        // Add the chapter section to the page.
        chapterExplorer.appendChild(chapterSection);

    });

})


// Handle errors.
.catch(error => {

    console.error("Error loading chapter data:", error);

    chapterExplorer.textContent =
        "Sorry, the chapter data could not be loaded.";

});
