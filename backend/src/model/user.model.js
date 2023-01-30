const mongoose = require("mongoose");
const { toJson } = require("./plugins");

const users = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "transgender"],
    },
    isVerified: {
      type: Boolean,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

users.plugin(toJson);

const User = mongoose.model("users", users);

module.exports = User;
