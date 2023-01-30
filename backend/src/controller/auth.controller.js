const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const config = require("../config/config");
const User = require("../model/user.model");
const createToken = require("../utils/createToken");
const HttpException = require("../utils/HttpException");
const HttpStatus = require("../utils/HttpStatus");
const { compare } = require("bcrypt");
const responseHandler = require("../utils/responseHandler");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "maths.anokhi3241@gmail.com",
    pass: "dptqcoijqolqckpb",
  },
});
const sendEmail = async (req, res, next) => {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
      return res.status(HttpStatus.CONFLICT).send({
        message: `Email-Id already exists.`,
      });
    }
    const user = await new User({
      _id: new mongoose.Types.ObjectId(),
      email: email,
      isVerified: false,
    }).save();
    const verificationToken = createToken(email);
    const url = `http://localhost:3000/verify/${verificationToken}`;
   const  sentmail =  await transporter.sendMail({
      from: config.emailUsername,
      to: email,
      subject: "Verify Account",
      html: `Click <a href = '${url}'>here</a> to confirm your email.`,
    });
    console.log("sentmail",sentmail)
    return res
      .status(HttpStatus.CREATED)
      .json(
        responseHandler(`Sent a verification email to ${email}`, HttpStatus.CREATED )
      );
  } catch (err) {
    return res.status(500).send(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json(responseHandler("User does not exists",HttpStatus.NOT_FOUND));
    }
    if (!user.isVerified) {
      return res.status(HttpStatus.CONFLICT).json(responseHandler("Verify your Account.",HttpStatus.CONFLICT));
    }
    const isEqual = await compare(password, user.password);
    
    if (!isEqual){
      return res.status(HttpStatus.UNAUTHORIZED).json(responseHandler("Email and Password mismatch.",HttpStatus.UNAUTHORIZED));
    }
    const authToken = createToken(email);
    let userdetail = await User.findById({ _id: user._id }).select("-password").exec();
    return res.status(HttpStatus.OK).json(responseHandler("User Logged in successfully.",HttpStatus.OK, { token : authToken, userdetail }));
  } catch (err) {
    return res.status(HttpStatus.SERVER).json(responseHandler("Something went wrong.",HttpStatus.SERVER));
  }
};
const handleResetPassword = async (req, res, next) => {
  try {
    const { email } = req.params;
    const existingUser = await User.findOne({ email }).exec();
    if (!existingUser) {
      res.status(HttpStatus.CONFLICT).json(
          responseHandler(
            "Email-id does not exist",
            HttpStatus.CONFLICT
          )
        );
    }
    if (!existingUser.isVerified) {
      res.status(HttpStatus.UNAUTHORIZED).json(
          responseHandler(
            "Verify your account",
            HttpStatus.UNAUTHORIZED
          )
        );
    }
    const verificationToken = createToken(email);
    const url = `http://localhost:3000/verify/${verificationToken}`;
     await transporter.sendMail({
      from: config.emailUsername,
      to: email,
      subject: "Verify Account",
      html: `Click <a href = '${url}'>here</a> to confirm your email.`,
    });
    return res
      .status(HttpStatus.CREATED)
      .json(
        responseHandler(`Sent a verification email to ${email}`, HttpStatus.CREATED )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { sendEmail, login,handleResetPassword };
