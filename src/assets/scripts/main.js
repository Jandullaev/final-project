let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: -25.344, lng: 131.031 };
  // Request needed libraries.
  //@ts-ignore
  let google;
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  new AdvancedMarkerElement({
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
  const bookTitle = document.getElementById("book-title");
  const bookSubject = document.getElementById("book-subject");
  const bookAuthor = document.getElementById("book-author");
  const bookDate = document.getElementById("book-date");
  const bookButton = document.getElementById("bookButton");
  const bookBooked = document.getElementById("bookBooked");
  const bookDesc = document.getElementById("book-desc");

  if (book) {
    bookImageElement.innerHTML = `<img src="${book.imageBook}" alt="${book.title}">`;
    bookTitle.innerHTML = `<p>${book.title}</p>`;
    bookSubject.innerHTML = `<p>${book.subject}</p>`;
    bookAuthor.innerHTML = `<p>${book.author}</p>`;
    bookDate.innerHTML = `<p>${book.dueDate}</p>`;
    bookButton.innerHTML = `<p>${book.bookBtn}</p>`;
  }

  if (book.bookBtn === "Booked") {
    bookButton.disabled = true;
    bookButton.style.backgroundColor = "#ddd";
    bookButton.style.transform = "scale(1)";
    bookBooked.innerHTML = `<p>${book.bookBtn}</p>`;
    bookDesc.innerHTML = "Your validity Date ";
  } else {
    bookButton.disabled = false;
    bookBooked.innerHTML = "";
    bookDesc.innerHTML = "";
  }
}

const serverEndpoint = "http://localhost:3000/books";
function handleBookButtonClick() {
  const bookDateElement = document.getElementById("book-date");
  const bookButton = document.getElementById("bookButton");
  const startDateInput = document.getElementById("startDate");
  const endDateInput = document.getElementById("endDate");

  if (startDateInput && endDateInput && bookDateElement && bookButton) {
    const selectedStartDate = startDateInput.value;
    const selectedEndDate = endDateInput.value;

    // Fetch data and update book
    fetch(serverEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const urlParams = new URLSearchParams(window.location.search);
        const bookId = urlParams.get("id");
        const book = data.find((item) => item.id == bookId);

        if (book) {
          book.dueDate = `From ${selectedStartDate} to ${selectedEndDate}`;

          if (!selectedStartDate.trim() || !selectedEndDate.trim()) {
            book.dueDate = "You must to select date!";
            bookDateElement.style.color = "crimson";
            bookButton.disabled = false;
          } else {
            book.dueDate = `From ${selectedStartDate} to ${selectedEndDate}`;
            bookButton.innerHTML = "Booked";
            book.bookBtn = "Booked";
            bookButton.disabled = true;
          }

          // Save the updated JSON data back to the server
          fetch(`${serverEndpoint}/${bookId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(book),
          })
            .then(() => {
              bookDateElement.innerHTML = `<p>${book.dueDate}</p>`;
            })
            .catch((error) =>
              console.error("Error saving updated data:", error)
            );
        }
      })
      .catch((error) => console.error("Error updating dueDate:", error));
  }
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
