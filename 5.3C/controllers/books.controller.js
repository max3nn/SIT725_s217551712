// Books Controller - handles request/response logic
const booksService = require('../services/books.service');

// Get all books
const getAllBooks = async (req, res, next) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json(books);
  } catch (err) {
    next(err);
  }
};

// Get book by ID
const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await booksService.getBookById(id);
    
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
