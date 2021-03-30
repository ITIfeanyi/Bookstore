const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

const Book = require("../models/bookSchema");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.locals.books = books;

    res.render("homepage", {
      title: "Home | Book-Africa",
      books,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
