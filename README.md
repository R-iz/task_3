Books REST API
A simple REST API for managing a collection of books built with Node.js and Express.js. This API provides full CRUD (Create, Read, Update, Delete) operations for book management with in-memory storage.

🚀 Live Demo
API Base URL: https://task-3-sage-five.vercel.app/

📋 Features
✅ Create new books
✅ Read all books or get a specific book by ID
✅ Update existing books
✅ Delete books
✅ In-memory storage (no database required)
✅ CORS enabled for cross-origin requests
✅ JSON responses with proper HTTP status codes
✅ Input validation and error handling
✅ RESTful API design principles
🛠️ Technology Stack
Runtime: Node.js
Framework: Express.js
Deployment: Vercel
Data Storage: In-memory (JavaScript array)

🧪 Testing with Postman
Import Collection
You can test all endpoints using Postman. Here's a quick setup:

Create a new collection in Postman
Add requests for each endpoint listed above
Set the base URL to: https://task-3-epvv.vercel.app
Add headers for POST/PUT requests: Content-Type: application/json
Test Sequence
GET /books - View initial books
POST /books - Create a new book
GET /books - Verify the book was added
GET /books/4 - Get the specific book you created
PUT /books/4 - Update the book
DELETE /books/4 - Delete the book

🎯 Task Requirements Fulfilled
✅ Node.js Express server - Built with Express.js framework
✅ Port 3000 - Configured to run on port 3000 (or Vercel's assigned port)
✅ In-memory storage - Uses JavaScript array to store book objects
✅ Book object structure - {id, title, author}
✅ GET /books - Returns all books
✅ POST /books - Adds new book from request body
✅ PUT /books/:id - Updates book by ID
✅ DELETE /books/:id - Removes book by ID
✅ Postman testing - All endpoints tested and documented

