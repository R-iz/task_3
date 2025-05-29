const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// In-memory storage for books
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
  { id: 3, title: "1984", author: "George Orwell" }
];

// Helper function to generate unique IDs
let nextId = 4;

// Root endpoint - API documentation
app.get('/', (req, res) => {
  res.json({
    message: 'Books REST API is running successfully!',
    version: '1.0.0',
    endpoints: {
      'GET /books': 'Get all books',
      'GET /books/:id': 'Get book by ID',
      'POST /books': 'Create new book (requires title and author in JSON body)',
      'PUT /books/:id': 'Update book by ID (requires title and author in JSON body)',
      'DELETE /books/:id': 'Delete book by ID'
    },
    example_requests: {
      'GET all books': `${req.protocol}://${req.get('host')}/books`,
      'GET book by ID': `${req.protocol}://${req.get('host')}/books/1`,
      'POST new book': {
        url: `${req.protocol}://${req.get('host')}/books`,
        method: 'POST',
        body: { title: "New Book", author: "Author Name" }
      }
    }
  });
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  console.log('GET /books - Retrieving all books');
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /books/:id - Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);
  
  if (!book) {
    console.log(`GET /books/${id} - Book not found`);
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  console.log(`GET /books/${id} - Book retrieved:`, book);
  res.json({
    success: true,
    data: book
  });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    console.log('POST /books - Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  // Create new book
  const newBook = {
    id: nextId++,
    title: title.trim(),
    author: author.trim()
  };
  
  books.push(newBook);
  console.log('POST /books - New book added:', newBook);
  
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook
  });
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;
  
  // Find book index
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    console.log(`PUT /books/${id} - Book not found`);
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  // Validation
  if (!title || !author) {
    console.log(`PUT /books/${id} - Missing required fields`);
    return res.status(400).json({
      success: false,
      message: 'Title and author are required'
    });
  }
  
  // Update book
  books[bookIndex] = {
    ...books[bookIndex],
    title: title.trim(),
    author: author.trim()
  };
  
  console.log(`PUT /books/${id} - Book updated:`, books[bookIndex]);
  
  res.json({
    success: true,
    message: 'Book updated successfully',
    data: books[bookIndex]
  });
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  // Find book index
  const bookIndex = books.findIndex(b => b.id === id);
  
  if (bookIndex === -1) {
    console.log(`DELETE /books/${id} - Book not found`);
    return res.status(404).json({
      success: false,
      message: 'Book not found'
    });
  }
  
  // Remove book
  const deletedBook = books.splice(bookIndex, 1)[0];
  console.log(`DELETE /books/${id} - Book deleted:`, deletedBook);
  
  res.json({
    success: true,
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Handle 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Books REST API server is running on port ${PORT}`);
  console.log(`📚 API Base URL: http://localhost:${PORT}`);
  console.log('\n📋 Available Endpoints:');
  console.log('  GET    /books      - Get all books');
  console.log('  GET    /books/:id  - Get book by ID');
  console.log('  POST   /books      - Create new book');
  console.log('  PUT    /books/:id  - Update book by ID');
  console.log('  DELETE /books/:id  - Delete book by ID');
  console.log('\n🧪 Ready for testing with Postman!');
});

// Export for Vercel
module.exports = app;