const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    BookTitle: String,
    BookYear: String,
    BookLanguage: String,
    BookPages: String,
    BookAuthor: String,
    ISBN: String,
    BookPublisher: String,
    BookCategory: String,
    BookFieldName: String,
    FileSize: Number,
    imagePath: String,
    BookPath: String,
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
