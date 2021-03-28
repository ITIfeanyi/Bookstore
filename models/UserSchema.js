const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please input your name"],
  },
  email: {
    type: String,
    required: [true, "Please fill in your email"],
    unique: true,
    validator: [isEmail, "This email is not valid"],
  },
  password: {
    type: String,
    required: [true, "please fill your password field"],
    minlength: [6, "Password must have a minimum lenght of six character"],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
