import express from 'express';
import { bookController } from '../controllers/bookController.js';

const router = express.Router();

// GET /api/books - Retrieve all books
router.get('/', bookController.getAllBooks);

// GET /api/books/search - Search books
router.get('/search', bookController.searchBooks);

// GET /api/books/:id - Retrieve a specific book by ID
router.get('/:id', bookController.getBookById);

// POST /api/books - Add a new book
router.post('/', bookController.createBook);

// PUT /api/books/:id - Update a book by ID
router.put('/:id', bookController.updateBook);

// DELETE /api/books/:id - Delete a book by ID
router.delete('/:id', bookController.deleteBook);

export default router;