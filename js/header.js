// Load Shared Header element
fetch("components/header.html")
.then(response => {
    if (!response.ok) {
        throw new Error("Could not load header")
    }

    return response.text();
})

.then(html => {
    document.getElementById("site-header").innerHTML = html;
    initialiseHeader();
})
.catch(error => {
    console.error("Header loading error:", error);
})

// Initialise Header functionality

function initialiseHeader() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".header-navigation");

    const searchToggle = document.querySelector(".search-toggle");
    const searchForm = document.querySelector(".search-form");

    // Expand and collapse search
    searchToggle.addEventListener("click", () => {
        searchForm.classList.toggle("active");

        if (searchForm.classList.contains("active")) {
            document.getElementById("site-search").focus();
        }
    });

    // Seatch submission
    searchForm.addEventListener("submit", event => {
        event.preventDefault();

        const searchTerm = document.getElementById("site-search").value.trim();

        if (searchTerm) {
            console.log("Search requested:", searchTerm);
        }
    });
}