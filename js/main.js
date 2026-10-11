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

    // For this demonstration, use the first chapter.
    const chapter = chapters[0];

    // Display the chapter title.
    const heading = document.createElement("h2");
    heading.textContent = chapter.title ?? `Chapter ${chapter.order}`;

    chapterExplorer.replaceChildren(heading);


    // Create a table for the kanji data.
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

    // Find the table body.
    const tableBody = table.querySelector("tbody");


    // Go through the kanji IDs listed in this chapter.
    chapter.kanji.forEach(kanjiId => {

        // Find the matching kanji record.
        const kanji = kanjiList.find(item => item.id === kanjiId);

        // Skip IDs that don't exist in kanji.json.
        if (!kanji) {
            console.warn(`Kanji ID not found: ${kanjiId}`);
            return;
        }


        // Find the element records associated with this kanji.
        const elements = kanji.elements.map(elementId => {

            return elementList.find(item => item.id === elementId);

        }).filter(element => element !== undefined);


        // Create a row for this kanji.
        const row = document.createElement("tr");


        // Create the ID cell.
        const idCell = document.createElement("td");
        idCell.textContent = kanji.id;
        row.appendChild(idCell);


        // Create the character cell.
        const characterCell = document.createElement("td");
        characterCell.textContent = kanji.character;
        row.appendChild(characterCell);


        // Create the keyword cell.
        const keywordCell = document.createElement("td");
        keywordCell.textContent = kanji.keyword;
        row.appendChild(keywordCell);


        // Create the elements cell.
        const elementsCell = document.createElement("td");

        if (elements.length > 0) {

            elementsCell.textContent = elements.map(element =>
                `${element.character} (${element.name})`
            ).join(", ");

        } else {

            elementsCell.textContent = "No elements assigned";

        }

        row.appendChild(elementsCell);


        // Add the row to the table.
        tableBody.appendChild(row);

    });


    // Add the finished table to the page.
    chapterExplorer.appendChild(table);

})


// Display an error if any of the JSON files fail to load.
.catch(error => {

    console.error("Error loading chapter data:", error);

    chapterExplorer.textContent =
        "Sorry, the chapter data could not be loaded.";

});
