const express = require("express");
const router = express.Router();
const passport = require("passport");

const handleErrors = (err) => {
  const errors = { email: "", password: "" };
};

router.get("/user/login", (req, res) => {
  res.render("login", {
    title: "Login | Book-Store",
  });
});

router.post(
  "/user/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

module.exports = router;
