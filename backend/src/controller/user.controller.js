const { hash } = require("bcrypt");
const config = require("../config/config");
const User = require("../model/user.model");
const HttpStatus = require("../utils/HttpStatus");
const responseHandler = require("../utils/responseHandler");
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')


cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSceret
})

const handlePassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const existingUser = await User.findOne({ email: req.user.email }).exec();
    if (!existingUser) {
      res.status(HttpStatus.CONFLICT).json(
          responseHandler(
            "Email-id does not exist",
            HttpStatus.CONFLICT
          )
        );
    }
    const hasPassword = await hash(password, 12);
    await User.findByIdAndUpdate({
      _id : existingUser._id },{
        password: hasPassword,
        isVerified : true
    }).exec();
    return res
      .status(HttpStatus.CREATED)
      .json(
        responseHandler("Your account verified and Password created successfully", HttpStatus.CREATED )
      );
  } catch (error) {
    next(error);
  }
};

const handleUserDetail = async (req,res,next) => {
try{
const { firstName ,lastName , birthDate ,gender} = req.body;
const existingUser = await User.findOne({email :  req.user.email}).exec();
if(!existingUser){
  res.status(HttpStatus.CONFLICT).json(
    responseHandler(
      "Email-id does not exist",
      HttpStatus.CONFLICT
    )
  );
}
const updateData = await User.findByIdAndUpdate({_id : existingUser._id } , {
  firstName ,lastName,dateOfBirth:birthDate,gender
}).exec();
return res
      .status(HttpStatus.OK)
      .json(
        responseHandler("User detail save successfully", HttpStatus.OK )
      );
  
}catch(error){
  next(error)
}
}

const getUserDetail = async (req,res,next) => {
  try{
  const {id} = req.query;
  const user = await User.findById({_id :id}).select("-password").exec();
    if(!user){
      res.status(HttpStatus.CONFLICT).json(
        responseHandler(
          "Something went wrong",
          HttpStatus.CONFLICT
        )
      );
    }
    return res
    .status(HttpStatus.OK)
    .json(
      responseHandler("User detail", HttpStatus.OK ,user)
    );
  }catch(error){
    next(error)
  }
  }
module.exports = { handlePassword  ,handleUserDetail ,getUserDetail};
