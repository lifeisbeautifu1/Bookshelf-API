const express = require('express');
const booksRouter = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require('../controllers/books');

booksRouter.post('/', createBook);

booksRouter.get('/', getAllBooks);

booksRouter.get('/:id', getBook);

booksRouter.patch('/:id', updateBook);

booksRouter.delete('/:id', deleteBook);

module.exports = booksRouter;
