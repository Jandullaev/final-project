"use strict";


//   ==========   FETCHING METHOD GET   ==========   //
document.addEventListener("DOMContentLoaded", function () {
  fetch("src/assets/library/library.json")
    .then((response) => response.json())
    .then((data) => {
      displayBooks(data.books);
      setupFilters();
      setupPagination(data.books);
    })
    .catch((error) => console.error("Error fetching data:", error));
});

function displayBooks(books) {
  const bookContainer = document.querySelector(".book_container");

  const templateElement = document.getElementById("book-template");
  const bookTemplate = templateElement.innerHTML;

  books.forEach((book) => {
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
  const newBookDiv = document.createElement("div");
  newBookDiv.className = "book_item";

  newBookDiv.innerHTML = html;

  return newBookDiv;
}

function setupPagination(books) {
  const booksPerPage = 10;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginationContainer = document.querySelector(".pagination ul");

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.tabIndex = 0;
    pageLink.addEventListener("click", function (event) {
      event.preventDefault();
      showPage(i, booksPerPage, books);
    });

    const listItem = document.createElement("li");
    listItem.appendChild(pageLink);
    paginationContainer.appendChild(listItem);
  }

  // Show the first page initially
  showPage(1, booksPerPage, books);
}

function showPage(pageNumber, itemsPerPage, books) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  books.forEach((book, index) => {
    const bookWrap = document.querySelector(`.book_wrap[data-id="${book.id}"]`);
    const bookItems = document.querySelectorAll(".book_item");
    if (index >= startIndex && index < endIndex) {
      bookItems[index].style.display = "grid"
      bookWrap.style.display = "grid";
    } else {
      bookItems[index].style.display = "none"
      bookWrap.style.display = "none";
    }
  });
}

function setupFilters() {
  const filterDropdown = document.getElementById("filter-dropdown");

  filterDropdown.addEventListener("change", function () {
    const filterValue = this.value;
    filterBooks(filterValue);
  });
}
//   ==========   END FETCHING   ==========   //

//   ==========   FILTERING   ==========   //
function filterBooks(subject) {
  const bookWrap = document.querySelectorAll(".book_wrap");
  const bookItems = document.querySelectorAll(".book_item");

  bookWrap.forEach((item, index) => {
    const subjectClass = item.classList.item(1);

    if (subject === "1" || subjectClass === subject) {
      item.style.display = "grid";
      if (bookItems[index]) {
        bookItems[index].style.display = "block";
        bookWrap[index].style.justifyContent = "normal";
      }
    } else {
      item.style.display = "none";
      if (bookItems[index]) {
        bookItems[index].style.display = "none";
      }
    }
  });
}
//   ==========   END FILTERING   ==========   //

//   ==========   SEARCHING   ==========   //
// eslint-disable-next-line no-unused-vars
const search = () => {
  const searchBox = document.getElementById("search").value.toUpperCase();
  const product = document.querySelectorAll(".book_container .book_wrap");
  const item = document.querySelectorAll(".book_item");

  for (var i = 0; i < product.length; i++) {
    let match = product[i].getElementsByClassName("book_info_title")[0];

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
  const foundItems = document.querySelector(
    ".book_container .book_wrap[style='display: grid;']"
  );

  if (!foundItems) {
    if (noResultsMessage) {
      noResultsMessage.style.display = "block";
    }
  } else {
    if (noResultsMessage) {
      noResultsMessage.style.display = "none";
    }
  }
};
//   ==========   END SEARCHING   ==========   //
