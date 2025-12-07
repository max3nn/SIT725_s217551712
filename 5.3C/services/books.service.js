// Books Service - handles data access from MongoDB
const Book = require('../models/book.model');

// Get all books from database
const getAllBooks = async () => {
  return await Book.find({});
};

// Get book by ID from database
const getBookById = async (id) => {
  return await Book.findById(id);
};

module.exports = {
  getAllBooks,
  getBookById
};
