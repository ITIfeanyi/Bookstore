const express = require("express");
const router = express.Router();
const User = require("../models/UserSchema");

const Book = require("../models/bookSchema");

router.get("/book/:ID", async (req, res) => {
  const id = req.params.ID;
  const singleBook = await Book.findById(id);
  res.locals.singleBook = singleBook;

  const bookSize = (() => {
    if (singleBook.FileSize >= 1048576) {
      return (singleBook.FileSize / 1048576).toFixed(2) + "MB";
    }
    if (singleBook.FileSize >= 1024) {
      return (singleBook.FileSize / 1048576).toFixed(0) + "KB";
    }
    return null;
  })();
  res.locals.bookSize = bookSize;
  res.render("singleBook", {
    title: singleBook.BookTitle,
    singleBook,
    bookSize,
  });
});
module.exports = router;
