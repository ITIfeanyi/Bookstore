const express = require("express");
const router = express.Router();
const BookSchema = require("../models/bookSchema");

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
    res.render("singleBook", {
      title: singleBook.BookTitle,
      authenticated,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
