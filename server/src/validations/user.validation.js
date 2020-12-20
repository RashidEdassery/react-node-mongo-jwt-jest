const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updatePassword = {
  body: Joi.object().keys({
    id: Joi.string().custom(objectId),
    password: Joi.string().required(),
  }),
};

const authenticateUser = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  updatePassword,
  authenticateUser,
  getUser,
};
