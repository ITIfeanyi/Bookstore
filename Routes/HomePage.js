const express = require("express");
const router = express.Router();

const bookSchema = require("../models/bookSchema");
router.get("/", async (req, res) => {
  try {
    //Popular books
    let books = await bookSchema.find().where("BookRating").gte(4);
    res.locals.books = books;

    //you might be interested in::
    let lessPopularBooks = await bookSchema.find().lte("BookRating", 3);
    res.locals.lessPopularBooks = lessPopularBooks;
    res.render("homepage", {
      title: "Home | Book-Africa",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
