// eslint-disable-next-line no-undef
const express = require("express");
// eslint-disable-next-line no-undef
const bodyParser = require("body-parser");
// eslint-disable-next-line no-undef
const fs = require("fs");
// eslint-disable-next-line no-undef
const cors = require("cors");
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
let books = loadBooks();

function loadBooks() {
  try {
    // eslint-disable-next-line no-undef
    const data = fs.readFileSync("../library/library.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading library.json:", error);
    return [];
  }
}

function saveBooks() {
  try {
    const data = JSON.stringify(books, null, 2);
    fs.writeFileSync("../library/library.json", data, "utf-8");
  } catch (error) {
    console.error("Error writing library.json:", error);
  }
}

// Update book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const updatedBook = req.body;

  const index = books.findIndex((book) => book.id == bookId);

  if (index !== -1) {
    books[index] = updatedBook;
    saveBooks();
    res.json(updatedBook);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
