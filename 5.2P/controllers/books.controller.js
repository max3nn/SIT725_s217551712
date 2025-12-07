// Books Controller - handles request/response logic
const booksService = require('../services/books.service');

// Get all books
const getAllBooks = (req, res, next) => {
  try {
    const books = booksService.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

// Get book by ID
const getBookById = (req, res, next) => {
  try {
    const { id } = req.params;
    const book = booksService.getBookById(id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllBooks,
  getBookById
};
