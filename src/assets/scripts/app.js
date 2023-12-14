// app.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the library.json file
    fetch('assets/library/library.json')
        .then(response => response.json())
        .then(data => {
            // Process the data and display it on the web page
            displayBooks(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayBooks(books) {
    // Get the container where the books will be displayed
    const bookContainer = document.querySelector('.book_item');

    // Get the book template from the script tag
    const templateElement = document.getElementById('book-template');
    const bookTemplate = templateElement.innerHTML;

    // Iterate through the array of books
    books.forEach(book => {
        // Replace placeholders in the template with actual data
        const filledTemplate = fillTemplate(bookTemplate, book);

        // Create a new div element with the filled template
        const newBookElement = createBookElement(filledTemplate);

        // Append the new book element to the book container
        bookContainer.appendChild(newBookElement);
    });
}

function fillTemplate(template, data) {
    // Replace placeholders in the template with actual data
    return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
        return data[key] || match;
    });
}

function createBookElement(html) {
    // Create a new div element
    const newBookDiv = document.createElement('div');
    newBookDiv.className = 'book_item filter';

    // Set the inner HTML of the new div with the filled template
    newBookDiv.innerHTML = html;

    return newBookDiv;
}


//----- Searching -----//
const search = () => {
    const searchBox = document.getElementById("search").value.toUpperCase();
    const product = document.querySelectorAll(".book_item .book_wrap");

    for (var i = 0; i < product.length; i++) {
        let match = product[i].getElementsByClassName('book_info_title')[0];

        if (match) {
            let textValue = match.textContent || match.innerText;

            if (textValue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = "grid";
            } else {
                product[i].style.display = "none";
            }
        } 
    }
    const noResultsMessage = document.getElementById("no-results-message");
    const foundItems = document.querySelector(".book_item .book_wrap[style='display: grid;']");

    if (!foundItems) {
        if (noResultsMessage) {
            noResultsMessage.style.display = "block";
        }
    } else {
        // Hide the no results message if there are found items
        if (noResultsMessage) {
            noResultsMessage.style.display = "none";
        }
    }
}