// index.js - Main entry point
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // API Documentation
  res.status(200).json({
    message: 'Books REST API is running successfully!',
    version: '1.0.0',
    endpoints: {
      'GET /api/books': 'Get all books',
      'GET /api/books?id=1': 'Get book by ID',
      'POST /api/books': 'Create new book (requires title and author in JSON body)',
      'PUT /api/books?id=1': 'Update book by ID (requires title and author in JSON body)',
      'DELETE /api/books?id=1': 'Delete book by ID'
    },
    example_requests: {
      'GET all books': `${req.headers.host}/api/books`,
      'POST new book': {
        url: `${req.headers.host}/api/books`,
        method: 'POST',
        body: { title: "New Book", author: "Author Name" }
      }
    }
  });
}