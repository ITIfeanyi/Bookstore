const express = require("express");
const router = express.Router();

const bookSchema = require("../models/bookSchema");

router.get("/", async (req, res) => {
  try {
    let books = await bookSchema.find({});
    res.locals.books = books;

    res.render("homepage", {
      title: "Home | Book-Africa",
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
