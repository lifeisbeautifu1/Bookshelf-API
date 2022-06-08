const { BadRequest, NotFound } = require('../errors');
const {StatusCodes} = require('http-status-codes');
const Book = require('../models/Book');

const getAllBooks = async (req, res) => {

  const queryObject = {};

  const {title, author, sort, genre, fields, numericFilters} = req.query;

  if (title) {
    queryObject.title = title;
  }

  if (author) {
    queryObject.author = author;
  }

  if (genre) {
    queryObject.genre = genre;
  }

  const operationMap = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    "<=": '$lte',
  };


  const validFields = ['price'];
  const regEx = /\b(<|>|=|<=|>=)\b/g;

  if (numericFilters) {
    let filters = numericFilters.replace(regEx, (math) => {
      return `-${operationMap[math]}-`
    });
    filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (validFields.includes(field)) {
        queryObject[field] = { [operator]: Number(value)};
      }
    });
  }


  let result = Book.find(queryObject);


  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('price');
  }

  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result.select(fieldsList); // 'author title ' => {author, title}
                              // result.map((item) => {item.author, item.title})
  }

  const limit = req.query.limit || 20;
  const page = req.query.page || 1;
  const skip = (page - 1 ) * limit;

  result = result.skip(skip).limit(limit);

  const books = await result;

  res.status(StatusCodes.OK).json( {count: books?.length, books});
};

const getBook = async (req, res) => {

  const { id: BookId } = req.params;

  const book = await Book.findOne({_id: BookId});

  if (!book) 
    throw new NotFound(`Book with id ${BookId} doesn't exist!`);

  res.status(StatusCodes.OK).send({book});
};

const createBook = async (req, res) => {

  const book = await Book.create(req.body);

  res.status(StatusCodes.CREATED).send({book});

};

const updateBook = async (req, res) => {

  const {id: BookId} = req.params;

  const {title, description, price, author, thumbnail, genre} = req.body;

  if (!title && !description && !price && !author && !thumbnail && !genre)
    throw new BadRequest('Please provide field to change!');

  const book = await Book.findByIdAndUpdate({_id: BookId}, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book)
    throw new NotFound(`Book with id ${BookId} doesn't exist!`);

  res.status(StatusCodes.OK).json({book});
};

const deleteBook = async (req, res) => {

  const {id: BookId} = req.params;

  const book = await Book.findByIdAndDelete({_id: BookId});

  if (!book)
    throw new NotFound(`The book with id ${BookId} doesn't exist!`);

  res.status(StatusCodes.OK).json({book});
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
