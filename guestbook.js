document.addEventListener("DOMContentLoaded", function () {
    const guestBookForm = document.getElementById("guestBookForm");
    const nameInput = document.getElementById("name");
    const commentInput = document.getElementById("comment");
    const entriesContainer = document.getElementById("entries");

    // Load saved entries from localStorage
    function loadEntries() {
        const savedEntries = JSON.parse(localStorage.getItem("guestEntries")) || [];
        savedEntries.forEach(entry => addEntryToDOM(entry.name, entry.comment));
    }

    // Add a new entry to the DOM
    function addEntryToDOM(name, comment) {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        const nameElement = document.createElement("strong");
        nameElement.textContent = name;

        const commentElement = document.createElement("p");
        commentElement.textContent = comment;

        entryDiv.appendChild(nameElement);
        entryDiv.appendChild(commentElement);
        entriesContainer.appendChild(entryDiv);
    }

    // Handle form submission
    guestBookForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (name && comment) {
            addEntryToDOM(name, comment);

            // Save entry to localStorage
            const savedEntries = JSON.parse(localStorage.getItem("guestEntries")) || [];
            savedEntries.push({ name, comment });
            localStorage.setItem("guestEntries", JSON.stringify(savedEntries));

            // Clear form fields
            nameInput.value = "";
            commentInput.value = "";
        }
    });

    loadEntries();
});
