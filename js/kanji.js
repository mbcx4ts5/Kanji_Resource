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

        // Create the kanji ID
        const kanjiIdSection = document.createElement("p");
        kanjiIdSection.className = "kanji-id";
        kanjiIdSection.textContent = kanji.id;
        page.appendChild(kanjiIdSection);
        
        // Create the kanji hero
        const kanjiHero = document.createElement("div");
        kanjiHero.className = "kanji-hero";

        // Create character and keywords and append to hero
        const characterHeading = document.createElement("h1");
        characterHeading.className = "kanji-character";
        characterHeading.textContent = kanji.character;
        kanjiHero.appendChild(characterHeading);

        const keywordHeading = document.createElement("h2");
        keywordHeading.className = "kanji-keyword";
        keywordHeading.textContent = kanji.keyword;
        kanjiHero.appendChild(keywordHeading);

        page.appendChild(kanjiHero);

    });
