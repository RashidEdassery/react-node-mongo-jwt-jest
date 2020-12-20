const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config/config');
const { Token } = require('../models');

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, secret = config.secretKey) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: moment().add(config.tokenValidDays, 'days').unix(),
  };
  return jwt.sign(payload, secret);
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

module.exports = {
  generateToken,
  verifyToken,
};
