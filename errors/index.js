const CustomApiError = require('./Error');
const BadRequest = require('./BadRequest');
const UnauthenticatedError = require('./Unauthorized');
const NotFound = require('./NotFound');

module.exports = {
  CustomApiError,
  BadRequest,
  UnauthenticatedError,
  NotFound,
};
