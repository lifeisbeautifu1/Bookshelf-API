const express = require('express');
const router = express.Router();

const {
  getAllBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require('../controllers/books');

router.post('/', createBook);

router.get('/', getAllBooks);

router.get('/:id', getBook);

router.patch('/:id', updateBook);

router.delete('/:id', deleteBook);

module.exports = router;
