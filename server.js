const express = require("express");

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Add this line near the top of the file, after the imports
// to ensure the server works correctly on Vercel
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }
  next()
})

// In-memory storage for books
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" },
]

// Helper function to generate unique IDs
let nextId = 4

// GET /books - Retrieve all books
app.get("/books", (req, res) => {
  console.log("📚 GET /books - Retrieving all books")
  res.json({
    success: true,
    count: books.length,
    data: books,
  })
})

// GET /books/:id - Retrieve a specific book by ID
app.get("/books/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  console.log(`📖 GET /books/${id} - Retrieving book with ID ${id}`)

  const book = books.find((b) => b.id === id)

  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${id} not found`,
    })
  }

  res.json({
    success: true,
    data: book,
  })
})

// POST /books - Add a new book
app.post("/books", (req, res) => {
  console.log("➕ POST /books - Adding new book")

  const { title, author } = req.body

  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Title and author are required",
    })
  }

  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim(),
  }

  books.push(newBook)

  console.log(`✅ Book added: ${newBook.title} by ${newBook.author}`)

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: newBook,
  })
})

// PUT /books/:id - Update a book by ID
app.put("/books/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  console.log(`✏️ PUT /books/${id} - Updating book with ID ${id}`)

  const bookIndex = books.findIndex((b) => b.id === id)

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${id} not found`,
    })
  }

  const { title, author } = req.body

  // Validation
  if (!title || !author) {
    return res.status(400).json({
      success: false,
      message: "Title and author are required",
    })
  }

  // Update the book
  books[bookIndex] = {
    ...books[bookIndex],
    title: title.trim(),
    author: author.trim(),
  }

  console.log(`✅ Book updated: ${books[bookIndex].title} by ${books[bookIndex].author}`)

  res.json({
    success: true,
    message: "Book updated successfully",
    data: books[bookIndex],
  })
})

// DELETE /books/:id - Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  console.log(`🗑️ DELETE /books/${id} - Deleting book with ID ${id}`)

  const bookIndex = books.findIndex((b) => b.id === id)

  if (bookIndex === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with ID ${id} not found`,
    })
  }

  const deletedBook = books[bookIndex]
  books.splice(bookIndex, 1)

  console.log(`✅ Book deleted: ${deletedBook.title} by ${deletedBook.author}`)

  res.json({
    success: true,
    message: "Book deleted successfully",
    data: deletedBook,
  })
})

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Books REST API!",
    endpoints: {
      "GET /books": "Get all books",
      "GET /books/:id": "Get a specific book",
      "POST /books": "Create a new book",
      "PUT /books/:id": "Update a book",
      "DELETE /books/:id": "Delete a book",
    },
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message)
  res.status(500).json({
    success: false,
    message: "Internal server error",
  })
})

// Handle 404 for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  })
})

// Start the server
export default app;
  console.log("📋 Available endpoints:")
  console.log("  GET    /books      - Get all books")
  console.log("  GET    /books/:id  - Get book by ID")
  console.log("  POST   /books      - Create new book")
  console.log("  PUT    /books/:id  - Update book by ID")
  console.log("  DELETE /books/:id  - Delete book by ID")
  console.log("\n💡 Test the API using the examples below or with Postman!")
})

// Demo function to test all endpoints
async function testAPI() {
  const baseURL = `http://localhost:${PORT}`

  console.log("\n🧪 Testing API endpoints...\n")

  try {
    // Test GET all books
    console.log("1. Testing GET /books")
    let response = await fetch(`${baseURL}/books`)
    let data = await response.json()
    console.log("Response:", JSON.stringify(data, null, 2))

    // Test POST new book
    console.log("\n2. Testing POST /books")
    response = await fetch(`${baseURL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
      }),
    })
    data = await response.json()
    console.log("Response:", JSON.stringify(data, null, 2))

    // Test GET specific book
    console.log("\n3. Testing GET /books/1")
    response = await fetch(`${baseURL}/books/1`)
    data = await response.json()
    console.log("Response:", JSON.stringify(data, null, 2))

    // Test PUT update book
    console.log("\n4. Testing PUT /books/1")
    response = await fetch(`${baseURL}/books/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "The Great Gatsby (Updated)",
        author: "F. Scott Fitzgerald",
      }),
    })
    data = await response.json()
    console.log("Response:", JSON.stringify(data, null, 2))

    // Test DELETE book
    console.log("\n5. Testing DELETE /books/2")
    response = await fetch(`${baseURL}/books/2`, {
      method: "DELETE",
    })
    data = await response.json()
    console.log("Response:", JSON.stringify(data, null, 2))

    // Test GET all books again to see changes
    console.log("\n6. Testing GET /books (after changes)")
    response = await fetch(`${baseURL}/books`)
    data = await response.json()
    console.log("Response:", JSON.stringify(data, null, 2))
  } catch (error) {
    console.error("Test failed:", error.message)
  }
}

// Modify the testAPI function to only run in development mode
// Replace the setTimeout(testAPI, 1000) line at the bottom with:
if (process.env.NODE_ENV !== "production") {
  setTimeout(testAPI, 1000)
}
