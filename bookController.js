import { bookService } from '../services/bookService.js';

export const bookController = {
  // Get all books
  getAllBooks: (req, res) => {
    try {
      const books = bookService.getAllBooks();
      res.json({
        success: true,
        count: books.length,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Get book by ID
  getBookById: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const book = bookService.getBookById(id);
      
      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
      
      res.json({
        success: true,
        data: book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Create new book
  createBook: (req, res) => {
    try {
      const { title, author, year, genre } = req.body;
      
      // Validation
      if (!title || !author) {
        return res.status(400).json({
          success: false,
          message: 'Title and author are required'
        });
      }
      
      const newBook = bookService.createBook({ title, author, year, genre });
      
      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        data: newBook
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Update book
  updateBook: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { title, author, year, genre } = req.body;
      
      // Validation
      if (!title || !author) {
        return res.status(400).json({
          success: false,
          message: 'Title and author are required'
        });
      }
      
      const updatedBook = bookService.updateBook(id, { title, author, year, genre });
      
      if (!updatedBook) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Book updated successfully',
        data: updatedBook
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Delete book
  deleteBook: (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deletedBook = bookService.deleteBook(id);
      
      if (!deletedBook) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }
      
      res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  // Search books
  searchBooks: (req, res) => {
    try {
      const query = req.query.q;
      
      if (!query) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required'
        });
      }
      
      const results = bookService.searchBooks(query);
      
      res.json({
        success: true,
        count: results.length,
        data: results
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};