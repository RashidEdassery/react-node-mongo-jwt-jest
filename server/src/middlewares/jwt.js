const expressJwt = require('express-jwt');
const config = require('../config/config');

function jwt() {
  const { secretKey } = config;
  return expressJwt({ secret: secretKey, algorithms: ['HS256'] }).unless({
    path: [
      // public routes that don't require authentication
      '/v1/users/create',
      '/v1/users/authenticate',
    ],
  });
}

module.exports = jwt;
