const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, tokenService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = tokenService.generateToken(user.id);
  res.status(httpStatus.CREATED).send({ user, token });
});

const updatePassword = catchAsync(async (req, res) => {
  await userService.updateUser(req.body);
  res.status(httpStatus.NO_CONTENT).send();
});

const authenticateUser = catchAsync(async (req, res) => {
  const user = await userService.authenticate(req.body.email, req.body.password);
  const token = tokenService.generateToken(user.id);
  res.status(httpStatus.OK).send({ user, token });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

module.exports = {
  createUser,
  updatePassword,
  authenticateUser,
  getUser,
};
