const Joi = require("joi");

const userPassword = {
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
};


const userDetails = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.string().required(),
    gender : Joi.string().required()
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
};

const userIdValidation =
{
  query: Joi.object().keys({
    id:  Joi.string().required(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }),
};
module.exports = { userPassword , userIdValidation };