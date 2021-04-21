const mongoose = require("mongoose");
const mongoosastic = require("mongoosastic");

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
    BookDescription: String,
    BookRating: Number,
    FileSize: Number,
    imagePath: String,
    BookPath: String,
  },
  { timestamps: true }
);

BookSchema.plugin(mongoosastic, {
  hosts: ["localhost:9200"],
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
