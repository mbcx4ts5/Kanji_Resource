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


        // Create a table for the chapter's kanji data.
        const table = document.createElement("table");

        // Create the table headings.
        table.innerHTML = `
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Kanji</th>
                    <th>Keyword</th>
                    <th>Elements</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

        // Find the table body from style.css.
        const tableBody = table.querySelector("tbody");


        // Go through the kanji IDs listed in this chapter.
        chapter.kanji.forEach(kanjiId => {

            // Find the matching kanji record.
            const kanji = kanjiList.find(item => item.id === kanjiId);

            // Skip IDs that don't exist in kanji.json
            if (!kanji) {
                console.warn(`Kanji ID not found: ${kanjiId}`);
                return;
            }

            
            // Find the elements associated with this kanji.
            const elements = kanji.elements
                .map(elementId =>
                    elementList.find(item => item.id === elementId)
                )
                .filter(element => element !== undefined);

            
            // Create a row for this kanji.
            const row = document.createElement("tr");


            // Display the ID.
            const idCell = document.createElement("td");
            idCell.textContent = kanji.id;
            row.appendChild(idCell);


            // Display the kanji character.
            const characterCell = document.createElement("td");
            characterCell.textContent = kanji.character;
            row.appendChild(characterCell);


            // Display the keyword.
            const keywordCell = document.createElement("td");
            keywordCell.textContent = kanji.keyword;
            row.appendChild(keywordCell);


            // Display the elements.
            const elementsCell = document.createElement("td");

            if (elements.length > 0) {

                elementsCell.textContent = elements
                    .map(element => `${element.character} (${element.name})`)
                    .join(", ");

            } else {

                elementsCell.textContent = "No elements assigned";

            }

            row.appendChild(elementsCell);


            // Add the row to the table.
            tableBody.appendChild(row);

        });


        // Add the completed table to the chapter section.
        // chapterSection.appendChild(table);
        
        // Create the buttons grid
        const kanjiGrid = document.createElement("div");
        kanjiGrid.className = "kanji-grid";
        
        // Go through the kanji IDs listed in this chapter.
        chapter.kanji.forEach(kanjiId => {

            // Find the matching kanji record.
            const kanji = kanjiList.find(item => item.id === kanjiId);

            // Skip IDs that don't exist in kanji.json
            if (!kanji) {
                console.warn(`Kanji ID not found: ${kanjiId}`);
                return;
            }


            // Find the elements associated with this kanji.
            const elements = kanji.elements
                .map(elementId =>
                    elementList.find(item => item.id === elementId)
                )
                .filter(element => element !== undefined);


            // Create buttons, character, ID and keyword labels for buttons
            const button = document.createElement("button");
            button.className = "kanji-button";

            const character = document.createElement("span");
            character.className = "kanji-button-character";
            character.textContent = kanji.character;

            const id = document.createElement("span");
            id.className = "kanji-button-id";
            id.textContent = kanji.id;

            const keyword = document.createElement("span");
            keyword.className = "kanji-button-keyword";
            keyword.textContent = kanji.keyword

            button.appendChild(character);
            button.appendChild(id);
            button.appendChild(keyword);

            button.addEventListener("click", () => {
                window.location.href = `kanji.html?id=${kanji.id}`;
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
