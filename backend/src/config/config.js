const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../../.env") });
const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(9000),
    BASE_URL: Joi.string().required().description("Base url"),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    JWT_SECRET_KEY : Joi.string().required().description("jwt secret key"),
    EMAIL_USERNAME : Joi.string().required().description("email username"),
    EMAIL_PASSWORD : Joi.string().required().description("email password"),
    CLOUD_NAME: Joi.string().required().description("cloudinary cloud name"),
    CLOUDINARY_API_KEY :Joi.string().required().description("cloudinary api key"), 
    CLOUDINARY_API_SECRET :Joi.string().required().description("cloudinary secret") 
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  baseUrl: envVars.BASE_URL,
  jwtSecretKey : envVars.JWT_SECRET_KEY,
  emailUsername : envVars.EMAIL_USERNAME,
  emailPassword : envVars.EMAIL_PASSWORD,
  cloudinary : {
    cloudName : envVars.CLOUD_NAME,
    apiKey : envVars.CLOUDINARY_API_KEY,
    apiSceret: envVars.CLOUDINARY_API_SECRET
  },
  mongoose: {
    url: envVars.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }
};
