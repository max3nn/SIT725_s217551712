// Books Routes - maps URLs to controller functions
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books.controller');

// GET /api/books - Get all books
router.get('/', booksController.getAllBooks);

// GET /api/books/:id - Get book by ID
router.get('/:id', booksController.getBookById);

module.exports = router;
