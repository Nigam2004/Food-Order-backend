const { string } = require("joi");
const mongoose = require("mongoose");
const user = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    confirmPassword: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const users = mongoose.model("user", user);
module.exports = users;
