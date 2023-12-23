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
});

function fetchBookDetails(bookId) {
  // Fetch book details from your data source (e.g., another JSON file or API)
  // Replace this with your actual data fetching logic
  fetch("assets/library/library.json")
    .then((response) => response.json())
    .then((data) => {
      const book = data.find((item) => item.id == bookId);
      displayBookDetails(book);
    })
    .catch((error) => console.error("Error fetching book details:", error));
}

function displayBookDetails(book) {
  // Update the content on the page with book details
  const bookImageElement = document.getElementById("bookImage");
  const bookTitle = document.getElementById("bookTitle");
  const bookSubject = document.getElementById("bookSubject");
  const bookDate = document.getElementById("bookDate");

  if (book) {
    bookImageElement.innerHTML = `<img src="${book.imageBook}" alt="${book.title}">`;
    bookTitle.innerHTML = `<p>${book.title}</p>`; // Add the book description property if available
    bookSubject.innerHTML = `<p>${book.subject}</p>`; // Add the book description property if available
    bookDate.innerHTML = `<p>${book.dueDate}</p>`; // Add the book description property if available
  }
}

const toggle = document.getElementsByClassName("toggle")[0];
const ul = document.getElementsByClassName("ul")[0];
const navItems = document.getElementsByClassName("header_inner_nav")[0];

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  ul.classList.toggle("active");
  navItems.classList.toggle("active");
});
