const jwt = require("jsonwebtoken");
const config = require("../config/config");
const HttpStatus = require("../utils/HttpStatus");
const HttpException = require("../utils/HttpException");

const userIdentifier = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      var res = token.replace(/^["'](.+(?=["']$))["']$/, '$1');
      let jwtSecretKey = config.jwtSecretKey;

      jwt.verify(res, jwtSecretKey, (err, user) => {
        if (err) {
          throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
        }
        req.user = user;
        next();
      });
    }else{
      throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userIdentifier;
