// Get Kanji ID
const params = new URLSearchParams(window.location.search);
const kanjiId = params.get("id");

console.log(kanjiId)

// Load json data and turn it into JS data
Promise.all([
    fetch("data/kanji.json").then(response => response.json()),
    fetch("data/elements.json").then(response => response.json()),
    fetch("data/chapters.json").then(response => response.json())
])

// Find the kanji object with the same ID as kanjiId, the page ID
.then(([kanjiList, elementList, chapters]) => {
    // Find the kanji from the list with the relevant id
    const kanji = kanjiList.find(item => item.id === kanjiId);

    // Find the kanji-page element
    const page = document.getElementById("kanji-page");

    // Clear the loading message
    page.replaceChildren();

    // Create the navigation bar
    const navigation = document.createElement("nav");
    navigation.className = "kanji-navigation";

    // Create the previous button
    const previousButton = document.createElement("button");
    previousButton.textContent = "←";
    previousButton.disabled = true;

    // Create the next button
    const nextButton = document.createElement("button");
    nextButton.textContent = "→";
    nextButton.disabled = true;

    // Create the kanji ID
    const kanjiIdSection = document.createElement("p");
    kanjiIdSection.className = "kanji-id";
    kanjiIdSection.textContent = kanji.id;
    page.appendChild(kanjiIdSection);

    navigation.appendChild(previousButton);
    navigation.appendChild(kanjiIdSection);
    navigation.appendChild(nextButton);

    page.appendChild(navigation);
    
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

    // Create the kanji information card
    const kanjiInformationCard = document.createElement("section");
    kanjiInformationCard.className = "kanji-information";
    
    // Create the description section
    const descriptionSection = document.createElement("section");

    const descriptionHeading = document.createElement("h2");
    descriptionHeading.textContent = "About this kanji";

    const descriptionText = document.createElement("p");
    descriptionText.textContent = kanji.description;

    descriptionSection.appendChild(descriptionHeading);
    descriptionSection.appendChild(descriptionText);

    kanjiInformationCard.appendChild(descriptionSection);

    // Create the grade section
    const gradeSection = document.createElement("section");
    
    const gradeHeading = document.createElement("h2");
    gradeHeading.textContent = "Grade";

    const gradeText = document.createElement("p");
    gradeText.textContent = kanji.grade;

    gradeSection.appendChild(gradeHeading);
    gradeSection.appendChild(gradeText);
    kanjiInformationCard.appendChild(gradeSection);

    // Create the vocabulary section
    const vocabularySection = document.createElement("section");
    const vocabularyHeading = document.createElement("h2");
    vocabularyHeading.textContent = "Vocabulary";
    const vocabularyList = document.createElement("ul");

    kanji.vocabulary.forEach(word => {
        const vocabularyItem = document.createElement("li");
        vocabularyItem.textContent = word;
        vocabularyList.appendChild(vocabularyItem);
    });

    vocabularySection.appendChild(vocabularyHeading);
    vocabularySection.appendChild(vocabularyList);
    kanjiInformationCard.appendChild(vocabularySection)

    //Create the elements section
    const elemenetsSection = document.createElement("section");
    const elementsHeading = document.createElement("h2");
    elementsHeading.textContent = "Elements";

    const elementsText = document.createElement("p");
    kanji.elements.forEach(elementId => {
        const element = elementList.find(item => item.id === elementId);

        if (element) {
            const elementName = document.createElement("em"); // Emphasised text in italics
            elementName.textContent = element.name.charAt(0).toLowerCase() + element.name.slice(1);
            elementsText.appendChild(elementName);
            elementsText.appendChild(document.createTextNode("-"));
        }
    });

    elemenetsSection.appendChild(elementsHeading);
    elemenetsSection.appendChild(elementsText);

    kanjiInformationCard.appendChild(elemenetsSection);

    // Append Kanji information card
    page.appendChild(kanjiInformationCard);

});
