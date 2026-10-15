// Get Kanji ID
const params = new URLSearchParams(window.location.search);
const kanjiId = params.get("id");

console.log(kanjiId)

// Load json data and turn it into JS data
fetch("data/kanji.json")
    .then(response => response.json())

    // Find the kanji object with the same ID as kanjiId, the page ID
    .then(kanjiList =>{
        const kanji = kanjiList.find(item => item.id === kanjiId);

        // Find the kanji-page element
        const page = document.getElementById("kanji-page");

        // Clear the loading message
        page.replaceChildren();

        // Create character and keywords and append to page
        const characterHeading = document.createElement("h1");
        characterHeading.textContent = kanji.character;
        page.appendChild(characterHeading);

        const keywordHeading = document.createElement("h2");
        keywordHeading.textContent = kanji.keyword;
        page.appendChild(keywordHeading);

    });
