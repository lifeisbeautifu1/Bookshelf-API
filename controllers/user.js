const User = require('../models/User');
const { UnauthenticatedError, BadRequest } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ count: users.length, users });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new BadRequest('Please provide email and passowrd!');

  const user = await User.findOne({ email });

  if (!user) throw new UnauthenticatedError('Invalid Credentials!');

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    throw new UnauthenticatedError('Invalid Credentials!');

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const register = async (req, res) => {
  // const { email, password, name } = req.body;
  // if (!name || !password || !name)
  // throw new BadRequest('Please provide all fields!');
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

module.exports = {
  login,
  register,
  getAllUsers,
};
