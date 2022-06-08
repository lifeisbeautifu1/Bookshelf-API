const { CustomApiError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

module.exports = errorHandler;
