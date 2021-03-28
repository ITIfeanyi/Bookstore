const express = require("express");
const router = express.Router();

const handleErrors = (err) => {
  const errors = {email:"", password:""}
}

router.get("/user/login", (req, res) => {
  res.render("login", {
    title: "Login | Book-Store",
  });
});

router.post("/user/login", (req, res) => {
  const { email, password } = req.body;
  try {
    
  } catch (err) {
    const error = handleErrors(err)
    res.status(400).json(error)
  }
  console.log(email, password);
});

module.exports = router;
