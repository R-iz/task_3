// In-memory storage for books
let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "Classic" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "Fiction" },
  { id: 3, title: "1984", author: "George Orwell", year: 1949, genre: "Dystopian" }
];

// Helper function to generate unique IDs
let nextId = 4;

export const bookService = {
  // Get all books
  getAllBooks: () => {
    return books;
  },

  // Get book by ID
  getBookById: (id) => {
    return books.find(book => book.id === id);
  },

  // Create new book
  createBook: (bookData) => {
    const newBook = {
      id: nextId++,
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      year: bookData.year || null,
      genre: bookData.genre || null
    };
    
    books.push(newBook);
    return newBook;
  },

  // Update book
  updateBook: (id, bookData) => {
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      return null;
    }
    
    books[bookIndex] = {
      ...books[bookIndex],
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      year: bookData.year !== undefined ? bookData.year : books[bookIndex].year,
      genre: bookData.genre !== undefined ? bookData.genre : books[bookIndex].genre
    };
    
    return books[bookIndex];
  },

  // Delete book
  deleteBook: (id) => {
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
      return null;
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    return deletedBook;
  },

  // Search books
  searchBooks: (query) => {
    const searchTerm = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(searchTerm) || 
      book.author.toLowerCase().includes(searchTerm) ||
      (book.genre && book.genre.toLowerCase().includes(searchTerm))
    );
  }
};