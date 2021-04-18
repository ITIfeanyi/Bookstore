const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

const handleErrors = (err) => {
  let errors = { name: "", email: "", password: "" };
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
  try {
    const { name, email, password } = req.body;

    const newUser = await new User({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.json({ user: newUser._id });
  } catch (error) {
    const errors = handleErrors(error);
    return res.json({ errors });
  }
});

module.exports = router;
