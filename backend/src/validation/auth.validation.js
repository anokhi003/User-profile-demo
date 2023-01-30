const Joi = require("joi");

const loginValidation = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const resetPassword = {
  params: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

module.exports = { loginValidation ,resetPassword};