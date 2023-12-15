"use strict";
document.addEventListener('DOMContentLoaded', function () {
    fetch('assets/library/library.json')
        .then(response => response.json())
        .then(data => {
            displayBooks(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayBooks(books) {
    const bookContainer = document.querySelector('.book_container');

    const templateElement = document.getElementById('book-template');
    const bookTemplate = templateElement.innerHTML;

    books.forEach(book => {
        const filledTemplate = fillTemplate(bookTemplate, book);
        const newBookElement = createBookElement(filledTemplate);
        bookContainer.appendChild(newBookElement);
    });
}

function fillTemplate(template, data) {
    return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
        return data[key] || match;
    });
}

function createBookElement(html) {
    const newBookDiv = document.createElement('div');
    newBookDiv.className = 'book_item';

    newBookDiv.innerHTML = html;

    return newBookDiv;
}


//----- Searching -----//
const search = () => {
    const searchBox = document.getElementById("search").value.toUpperCase();
    const product = document.querySelectorAll(".book_container .book_wrap");
    const item = document.querySelectorAll(".book_item")


    for (var i = 0; i < product.length; i++) {
        let match = product[i].getElementsByClassName('book_info_title')[0];

        if (match) {
            let textValue = match.textContent || match.innerText;

            if (textValue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = "grid";
                item[i].style.display = "grid";
            } else {
                product[i].style.display = "none";
                item[i].style.display = "none";
            }
        } 
    }
    const noResultsMessage = document.getElementById("no-results-message");
    const foundItems = document.querySelector(".book_container .book_wrap[style='display: grid;']");

    if (!foundItems) {
        if (noResultsMessage) {
            noResultsMessage.style.display = "block";
        }
    } else {
        if (noResultsMessage) {
            noResultsMessage.style.display = "none";
        }
    }
}
//----- End Searching -----//

//----- Filter -----//

