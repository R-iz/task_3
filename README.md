# Books REST API

A simple REST API for managing a collection of books built with Node.js and Express.js. This API provides full CRUD (Create, Read, Update, Delete) operations for book management with in-memory storage.

## 🚀 Live Demo

**API Base URL:** `https://task-3-epvv.vercel.app`

## 📋 Features

- ✅ **Create** new books
- ✅ **Read** all books or get a specific book by ID
- ✅ **Update** existing books
- ✅ **Delete** books
- ✅ In-memory storage (no database required)
- ✅ CORS enabled for cross-origin requests
- ✅ JSON responses with proper HTTP status codes
- ✅ Input validation and error handling
- ✅ RESTful API design principles

## 🛠️ Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Deployment:** Vercel
- **Data Storage:** In-memory (JavaScript array)

## 📚 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/` | API documentation | None |
| `GET` | `/books` | Get all books | None |
| `GET` | `/books/:id` | Get book by ID | None |
| `POST` | `/books` | Create new book | `{"title": "string", "author": "string"}` |
| `PUT` | `/books/:id` | Update book by ID | `{"title": "string", "author": "string"}` |
| `DELETE` | `/books/:id` | Delete book by ID | None |

## 🧪 API Testing Examples

### 1. Get API Documentation
```http
GET https://task-3-epvv.vercel.app/
```

**Response:**
```json
{
  "message": "Books REST API is working!",
  "endpoints": {
    "GET /books": "Get all books",
    "GET /books/:id": "Get book by ID",
    "POST /books": "Create new book",
    "PUT /books/:id": "Update book by ID",
    "DELETE /books/:id": "Delete book by ID"
  }
}
```

### 2. Get All Books
```http
GET https://task-3-epvv.vercel.app/books
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald"
    },
    {
      "id": 2,
      "title": "To Kill a Mockingbird",
      "author": "Harper Lee"
    },
    {
      "id": 3,
      "title": "1984",
      "author": "George Orwell"
    }
  ]
}
```

### 3. Get Book by ID
```http
GET https://task-3-epvv.vercel.app/books/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald"
  }
}
```

### 4. Create New Book
```http
POST https://task-3-epvv.vercel.app/books
Content-Type: application/json

{
  "title": "The Catcher in the Rye",
  "author": "J.D. Salinger"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 4,
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger"
  }
}
```

### 5. Update Book
```http
PUT https://task-3-epvv.vercel.app/books/1
Content-Type: application/json

{
  "title": "The Great Gatsby (Updated Edition)",
  "author": "F. Scott Fitzgerald"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated Edition)",
    "author": "F. Scott Fitzgerald"
  }
}
```

### 6. Delete Book
```http
DELETE https://task-3-epvv.vercel.app/books/1
```

**Response:**
```json
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby (Updated Edition)",
    "author": "F. Scott Fitzgerald"
  }
}
```

## 📝 Request/Response Format

### Request Headers
For POST and PUT requests, include:
```
Content-Type: application/json
```

### Request Body (POST/PUT)
```json
{
  "title": "Book Title (required)",
  "author": "Author Name (required)"
}
```

### Response Format
All responses follow this structure:
```json
{
  "success": boolean,
  "message": "string (optional)",
  "data": object | array,
  "count": number (for GET all books)
}
```

## ⚠️ Error Handling

### Common Error Responses

**400 Bad Request** - Missing required fields:
```json
{
  "success": false,
  "message": "Title and author are required"
}
```

**404 Not Found** - Book not found:
```json
{
  "success": false,
  "message": "Book not found"
}
```

**404 Not Found** - Invalid route:
```json
{
  "success": false,
  "message": "Route not found"
}
```

## 🧪 Testing with Postman

### Import Collection
You can test all endpoints using Postman. Here's a quick setup:

1. **Create a new collection** in Postman
2. **Add requests** for each endpoint listed above
3. **Set the base URL** to: `https://task-3-epvv.vercel.app`
4. **Add headers** for POST/PUT requests: `Content-Type: application/json`

### Test Sequence
1. **GET** `/books` - View initial books
2. **POST** `/books` - Create a new book
3. **GET** `/books` - Verify the book was added
4. **GET** `/books/4` - Get the specific book you created
5. **PUT** `/books/4` - Update the book
6. **DELETE** `/books/4` - Delete the book

## 🏗️ Project Structure

```
books-rest-api/
├── index.js          # Main Express server file
├── package.json      # Dependencies and scripts
└── README.md         # This documentation
```

## 🚀 Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd books-rest-api

# Install dependencies
npm install

# Start the server
npm start
```

The server will start on `http://localhost:3000`

## 📦 Deployment

This API is deployed on **Vercel** with automatic deployments from the main branch.

### Deploy to Vercel
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Deploy automatically

## 🔧 Configuration

### Environment Variables
- `PORT` - Server port (default: 3000)

### Dependencies
```json
{
  "express": "^4.18.2"
}
```

## 📊 Sample Data

The API comes pre-loaded with these books:

| ID | Title | Author |
|----|-------|--------|
| 1 | The Great Gatsby | F. Scott Fitzgerald |
| 2 | To Kill a Mockingbird | Harper Lee |
| 3 | 1984 | George Orwell |

## 🎯 Task Requirements Fulfilled

✅ **Node.js Express server** - Built with Express.js framework  
✅ **Port 3000** - Configured to run on port 3000 (or Vercel's assigned port)  
✅ **In-memory storage** - Uses JavaScript array to store book objects  
✅ **Book object structure** - `{id, title, author}`  
✅ **GET /books** - Returns all books  
✅ **POST /books** - Adds new book from request body  
✅ **PUT /books/:id** - Updates book by ID  
✅ **DELETE /books/:id** - Removes book by ID  
✅ **Postman testing** - All endpoints tested and documented  

