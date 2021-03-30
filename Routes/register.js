const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

const handleErrors = (err) => {
  console.log(err.code);
  const errors = { name: "", email: "", password: "" };
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
  if (err.code === 11000) {
    errors.email = "This email is attached to another user";
    return errors;
  }
};

router.get("/user/register", (req, res) => {
  res.render("register", {
    title: "Register | Book-Store",
  });
});

router.post("/user/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await new User({
      name,
      email,
      password,
    });
    const user = await newUser.save();
    if (user) {
      res.status(201).json({ user: user._id });
      res.redirect("/");
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
});

module.exports = router;
