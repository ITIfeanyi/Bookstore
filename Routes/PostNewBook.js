const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const router = express.Router();
const Book = require("../models/bookSchema");

router.get("/upload-book", (req, res) => {
  res.render("postBook", {
    title: "Upload a book | Book-Store",
  });
});

const s3 = new aws.S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
  secretAccessKey: `${process.env.AWS_ACCESS_PASSWORD}`,
});

const names = [];
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.AWS_BUCKET_NAME}`,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: async (req, file, cb) => {
      const { originalname } = file;
      const url = originalname.split(" ").join("+").replace(",", "%2C");
      names.push(originalname);
      cb(null, originalname);
    },
  }),
});
router.post(
  "/upload",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  (req, res) => {
    const {
      BookYear,
      BookLanguage,
      BookPages,
      BookPublisher,
      BookCategory,
      BookAuthor,
      ISBN,
    } = req.body;
    const newBook = new Book({});
    Object.values(req.files.avatar).forEach((file) => {
      newBook.imagePath = file.location;
    });
    Object.values(req.files.pdf).forEach((file) => {
      const bookName = file.key.replace("(z-lib.org)", "");
      newBook.BookTitle = bookName;
      newBook.FileSize = file.size;
      newBook.BookPath = file.location;
      newBook.BookFieldName = file.fieldname;
    });
    newBook.BookYear = BookYear;
    newBook.BookLanguage = BookLanguage;
    newBook.BookPages = BookPages;
    newBook.BookCategory = BookCategory;
    newBook.BookPublisher = BookPublisher;
    newBook.ISBN = ISBN;
    newBook.BookAuthor = BookAuthor;
    newBook.save();
    res.json({ status: "OK", uploaded: " files uploaded" });
  }
);

module.exports = router;
