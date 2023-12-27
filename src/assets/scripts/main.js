let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Uluru",
  });
}

initMap();

document.addEventListener("DOMContentLoaded", function () {
  // Get book ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const bookId = urlParams.get("id");

  // Fetch book details using the bookId
  fetchBookDetails(bookId);
  const bookButton = document.getElementById("bookButton");
  if (bookButton) {
    bookButton.addEventListener("click", handleBookButtonClick);
  }
});

function fetchBookDetails(bookId) {
  // Fetch book details from your data source (e.g., another JSON file or API)
  // Replace this with your actual data fetching logic
  fetch("assets/library/library.json")
      .then((response) => response.json())
      .then((data) => {
        // Access the "books" property in the JSON data
        const books = data.books || [];
        const book = books.find((item) => item.id == bookId);
        displayBookDetails(book);
      })
      .catch((error) => console.error("Error fetching book details:", error));
}

function displayBookDetails(book) {
  // Update the content on the page with book details
  const bookImageElement = document.getElementById("bookImage");
  const bookTitle = document.getElementById("bookTitle");
  const bookSubject = document.getElementById("bookSubject");
  const bookAuthor = document.getElementById("bookAuthor");
  const bookDate = document.getElementById("bookDate");
  const bookButton = document.getElementById("bookButton");

  if (book) {
    bookImageElement.innerHTML = `<img src="${book.imageBook}" alt="${book.title}">`;
    bookTitle.innerHTML = `<p>${book.title}</p>`; // Add the book description property if available
    bookSubject.innerHTML = `<p>${book.subject}</p>`;
    bookAuthor.innerHTML = `<p>${book.author}</p>`;
    bookDate.innerHTML = `<p>${book.dueDate}</p>`; // Add the book description property if available

    if (!book.isAvailable) {
      bookButton.disabled = true;
    }
  }
}

const serverEndpoint = "http://localhost:3000/books";
function handleBookButtonClick() {
  const bookDateElement = document.getElementById("bookDate");
  const bookButton = document.getElementById("bookButton");


  if (bookDateElement && bookButton) {
    // Update the dueDate in the JSON data
    fetch(serverEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get("id");
        const book = data.find((item) => item.id == bookId);

        if (book) {
          // Update dueDate to 1 month later
          const currentDate = new Date();
          const newDate = addOneMonth(currentDate);
          book.dueDate = newDate.toISOString().split("T")[0];

          // Save the updated JSON data back to the server
          fetch(`${serverEndpoint}/${bookId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
          })
            .then(() => {
              // Display the updated book date
              bookDateElement.innerHTML = `<p>Booked Successfully. Validity Period: ${book.dueDate}</p>`;

              // Disable the "Book" button
              bookButton.disabled = true;
            })
            .catch((error) => console.error("Error saving updated data:", error));
        }
      })
      .catch((error) => console.error("Error updating dueDate:", error));
  }
}

function addOneMonth(date) {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);

  return newDate;
}

// ---------- Navbar Click ---------- //

const toggle = document.getElementsByClassName("toggle")[0];
const ul = document.getElementsByClassName("ul")[0];
const navItems = document.getElementsByClassName("header_inner_nav")[0];

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  ul.classList.toggle("active");
  navItems.classList.toggle("active");
});

// ---------- End Navbar Click ---------- //
