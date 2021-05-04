const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "You are submitting an empty review."],
    min: 4,
    max: 120,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
});

const BookReview = mongoose.model("BookReview", reviewSchema);

module.exports = BookReview;
