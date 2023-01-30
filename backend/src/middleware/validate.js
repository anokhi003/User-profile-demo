const Joi = require("joi");
const HttpException = require("../utils/HttpException");
const pick = require("../utils/pick");

const validate = (schema) => (req, res, next) => {
  const validSchema = pick(schema, ["params", "query", "body"]);
  const object = pick(req, Object.keys(validSchema));
  if (object.body && typeof object.body === "string") {
    try {
      object.body = JSON.parse(object.body);
    } catch (error) {
      throw new HttpException("invalid_body", 400, true);
    }
  }
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    throw new HttpException(errorMessage, 400, true);
  }
  Object.assign(req, value);
  return next();
};

module.exports = validate;
