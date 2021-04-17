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

    //check if user is authenticated
    let authenticated = false;
    if (req.isAuthenticated) {
      authenticated = true;
    }
    res.locals.authenticated = authenticated;
    res.render("homepage", {
      title: "Home | Book-Africa",
      authenticated,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
