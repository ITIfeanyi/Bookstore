const express = require("express");
const router = express.Router();
const BookSchema = require("../models/bookSchema");
const reviewSchema = require("../models/reviewSchema");
router.get("/book/:ID", async (req, res) => {
  try {
    const id = req.params.ID;
    const books = await BookSchema.find({});
    const singleBook = await BookSchema.findById(id);
    res.locals.singleBook = singleBook;
    res.locals.books = books;

    const bookSize = (() => {
      if (singleBook.FileSize >= 1048576) {
        return (singleBook.FileSize / 1048576).toFixed(2) + "MB";
      }
      if (singleBook.FileSize >= 1024) {
        return (singleBook.FileSize / 1023).toFixed(0) + "KB";
      }
      return null;
    })();
    res.locals.bookSize = bookSize;
    //check if user is authenticated
    let authenticated = false;
    if (req.isAuthenticated()) {
      authenticated = true;
    }

    //send username into ejs
    res.locals.name = null;
    if (req.user) {
      res.locals.name = req.user.name;
    }
    res.render("singleBook", {
      title: singleBook.BookTitle,
      authenticated,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/book/:ID", async (req, res) => {
  try {
    const { bookId } = req.body;
    throw new Error("We are working on this section. Thank you");
    const book = await BookSchema.findById(bookId);
    // if (book) {
    //   const review = await new reviewSchema({
    //     comment: req.body.review,
    //     bookId: req.body.bookId,
    //   });
    // await review.save();
    // } else {
    //   throw new Error("The book above does not exist anymore");
    // }
  } catch (error) {
    res.status(500).json("We are working on this section. Thank you");
  }
});

module.exports = router;
