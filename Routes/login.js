const express = require("express");
const router = express.Router();
const passport = require("passport");

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

router.get("/", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/");
});

module.exports = router;
