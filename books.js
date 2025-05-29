// api/books.js - Vercel Serverless Function
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // In-memory storage (Note: This resets on each function call in serverless)
  // For demo purposes, we'll use static data
  let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" }
  ];

  const { method, query } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        if (id) {
          // GET single book
          const book = books.find(b => b.id === parseInt(id));
          if (!book) {
            return res.status(404).json({
              success: false,
              message: 'Book not found'
            });
          }
          return res.status(200).json({
            success: true,
            data: book
          });
        } else {
          // GET all books
          return res.status(200).json({
            success: true,
            count: books.length,
            data: books
          });
        }

      case 'POST':
        const { title, author } = req.body;
        
        if (!title || !author) {
          return res.status(400).json({
            success: false,
            message: 'Title and author are required'
          });
        }

        const newBook = {
          id: books.length + 1,
          title: title.trim(),
          author: author.trim()
        };

        books.push(newBook);
        
        return res.status(201).json({
          success: true,
          message: 'Book created successfully',
          data: newBook
        });

      case 'PUT':
        if (!id) {
          return res.status(400).json({
            success: false,
            message: 'Book ID is required'
          });
        }

        const bookIndex = books.findIndex(b => b.id === parseInt(id));
        if (bookIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Book not found'
          });
        }

        const { title: newTitle, author: newAuthor } = req.body;
        if (!newTitle || !newAuthor) {
          return res.status(400).json({
            success: false,
            message: 'Title and author are required'
          });
        }

        books[bookIndex] = {
          ...books[bookIndex],
          title: newTitle.trim(),
          author: newAuthor.trim()
        };

        return res.status(200).json({
          success: true,
          message: 'Book updated successfully',
          data: books[bookIndex]
        });

      case 'DELETE':
        if (!id) {
          return res.status(400).json({
            success: false,
            message: 'Book ID is required'
          });
        }

        const deleteIndex = books.findIndex(b => b.id === parseInt(id));
        if (deleteIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Book not found'
          });
        }

        const deletedBook = books.splice(deleteIndex, 1)[0];
        
        return res.status(200).json({
          success: true,
          message: 'Book deleted successfully',
          data: deletedBook
        });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({
          success: false,
          message: `Method ${method} Not Allowed`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}