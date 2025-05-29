
import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// In-memory storage for books
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
];

let nextId = 4;

// GET /books
app.get("/books", (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books,
  });
});

// GET /books/:id
app.get("/books/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ success: false, message: `Book with ID ${id} not found` });
  }
  res.json({ success: true, data: book });
});

// POST /books
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ success: false, message: "Title and author are required" });
  }
  const newBook = { id: nextId++, title: title.trim(), author: author.trim() };
  books.push(newBook);
  res.status(201).json({ success: true, message: "Book created successfully", data: newBook });
});

// PUT /books/:id
app.put("/books/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: `Book with ID ${id} not found` });
  }

  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ success: false, message: "Title and author are required" });
  }

  books[bookIndex] = { ...books[bookIndex], title: title.trim(), author: author.trim() };
  res.json({ success: true, message: "Book updated successfully", data: books[bookIndex] });
});

// DELETE /books/:id
app.delete("/books/:id", (req, res) => {
  const id = Number.parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: `Book with ID ${id} not found` });
  }
  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ success: true, message: "Book deleted successfully", data: deletedBook });
});

// Root
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Books REST API!",
    endpoints: {
      "GET /books": "Get all books",
      "GET /books/:id": "Get a specific book",
      "POST /books": "Create a new book",
      "PUT /books/:id": "Update a book",
      "DELETE /books/:id": "Delete a book"
    }
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Export app for Vercel
export default app;
