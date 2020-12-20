const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(userBody);
  return user;
};

/**
 * Update User
 * @param {Object} updateBody
 * @returns {Promise<user>}
 */
const updateUser = async (updateBody) => {
  const user = await User.findById(updateBody.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // if (updateBody.email && (await User.isEmailTaken(updateBody.email, updateBody.id))) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  Object.assign(user, { password: updateBody.password });
  await user.save();
  return user;
};

/**
 * Authenticate user
 * @param {String} email
 * @param {String} password
 * @returns {Promise<User>}
 */
const authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

module.exports = {
  createUser,
  updateUser,
  authenticate,
  getUserById,
};
