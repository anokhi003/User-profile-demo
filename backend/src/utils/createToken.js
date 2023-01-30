const jwt = require("jsonwebtoken");
const config = require("../config/config");

const createToken = (userEmail) => {
  let jwtSecretKey = config.jwtSecretKey;
  let data = {
    time: Date(),
    email: userEmail,
  };
  return jwt.sign(data, jwtSecretKey, { expiresIn: "24h" });
};

module.exports = createToken;
