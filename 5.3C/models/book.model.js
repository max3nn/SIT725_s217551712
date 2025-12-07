// Book Model - defines the structure of a book object with MongoDB schema
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    get: (value) => {
      if (value) {
        return parseFloat(value.toString());
      }
      return value;
    }
  }
}, {
  toJSON: { getters: true },
  toObject: { getters: true }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
