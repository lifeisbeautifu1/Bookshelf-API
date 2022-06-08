const { StatusCodes } = require('http-status-codes');

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send('Error 404, Page not Found!');
};

module.exports = notFound;
