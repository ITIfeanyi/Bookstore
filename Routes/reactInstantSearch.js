const express = require("express");
const router = express.Router();
const booksschema = require("../models/bookSchema");

router.get("/algolia", async (req, res) => {
  const books = await booksschema.find();
  return books.map((book) => {
    return {
      objectID: book._id,
      BookPath: book.BookPath,
      imagePath: book.imagePath,
      BookFieldName: book.BookFieldName,
      BookYear: book.BookYear,
      BookLanguage: book.BookLanguage,
      BookPublisher: book.BookPublisher,
      BookRating: book.BookRating,
      FileSize: book.FileSize,
      BookPages: book.BookPages,
    };
  });
});

module.exports = router;
