// Get Kanji ID
const params = new URLSearchParams(window.location.search);
const elementId = params.get("id");

console.log(elementId);

// Define function for the navigation buttons
function navigateToEntry(entryId) {
    if (entryId.startsWith("K-")) {
        window.location.href = `kanji.html?id=${entryId}`;
    } else if (entryId.startsWith("E-")) {
        window.location.href = `element.html?id=${entryId}`;
    }
};

// Load json data and turn it into JS data
Promise.all([
    fetch("data/kanji.json").then(response => response.json()),
    fetch("data/elements.json").then(response => response.json()),
    fetch("data/chapters.json").then(response => response.json())
])

// Find the kanji object with the same ID as elementId, the page ID
.then(([kanjiList, elementList, chapters]) => {
    // Find the kanji from the list with the relevant id
    const element = elementList.find(item => item.id === elementId);

    // Find the kanji-page element
    const page = document.getElementById("element-subsection");

    // Clear the loading message
    page.replaceChildren();

    // Get the full curriculum from chapters.json and current position
    const curriculumEntries = chapters.flatMap(chapter => chapter.entries);
    const currentIndex = curriculumEntries.indexOf(elementId);
    if (currentIndex === -1) {
        console.warn(`Entry ${elementId} is not in the curriculum`);
    }

    // Get the previous and next entries
    const previousEntry = curriculumEntries[currentIndex - 1];
    const nextEntry = curriculumEntries[currentIndex + 1];
    
    // Create the navigation bar
    const navigation = document.createElement("nav");
    navigation.className = "kanji-navigation";

    // Create the previous button
    const previousButton = document.createElement("button");
    previousButton.textContent = "←";
    previousButton.disabled = !previousEntry;
    previousButton.addEventListener("click", () => {
        if (previousEntry) {
            navigateToEntry(previousEntry);
        }
    });

    // Create the next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "→";
    nextButton.disabled = !nextEntry;
    nextButton.addEventListener("click", () => {
        if (nextEntry) {
            navigateToEntry(nextEntry);
        }
    });

    // Create the element icon
    const element_icon = document.createElement("h2")
    element_icon.textContent = element.character

    navigation.appendChild(previousButton);
    navigation.appendChild(element_icon);
    navigation.appendChild(nextButton);

    page.appendChild(navigation);
    
    // Create the kanji hero
    const kanjiHero = document.createElement("div");
    kanjiHero.className = "kanji-hero";

    // Create the kanji ID
    const elementIdSection = document.createElement("p");
    elementIdSection.className = "kanji-id";
    elementIdSection.textContent = element.id;
    kanjiHero.appendChild(elementIdSection);


    // Create character and keywords and append to hero
    const characterHeading = document.createElement("h1");
    characterHeading.className = "kanji-character";
    characterHeading.textContent = element.character;
    kanjiHero.appendChild(characterHeading);

    const keywordHeading = document.createElement("h2");
    keywordHeading.className = "kanji-keyword";
    keywordHeading.textContent = element.name;
    kanjiHero.appendChild(keywordHeading);

    page.appendChild(kanjiHero);

    // Create the kanji information card
    const kanjiInformationCard = document.createElement("section");
    kanjiInformationCard.className = "kanji-information";
    
    // Create the description section
    const descriptionSection = document.createElement("section");

    const descriptionText = document.createElement("p");
    descriptionText.textContent = element.description;

    descriptionSection.appendChild(descriptionText);

    kanjiInformationCard.appendChild(descriptionSection);

    //Create the components section
    if (element.components.length > 0) {

        const elementsSection = document.createElement("section");
        const elementsHeading = document.createElement("h2");
        elementsHeading.textContent = "Components";

        const elementsText = document.createElement("p");
        element.components.forEach((elementId, index) => {
            const element = elementList.find(item => item.id === elementId);
            if (element) {
                if (index > 0) {
                    elementsText.appendChild(document.createTextNode(", "));
                }
                const elementName = document.createElement("em"); // Emphasised text in italics
                elementName.textContent = element.name.toLowerCase();
                elementsText.appendChild(elementName);
            }

        
        });

        elementsSection.appendChild(elementsHeading);
        elementsSection.appendChild(elementsText);

        kanjiInformationCard.appendChild(elementsSection);
    }

    // Append Kanji information card
    page.appendChild(kanjiInformationCard);

});
