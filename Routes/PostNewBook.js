const express = require("express");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const router = express.Router();
const Book = require("../models/bookSchema");

router.get("/upload-book", (req, res) => {
  try {
    //check if user is authenticated
    let authenticated = false;
    if (req.isAuthenticated()) {
      authenticated = true;
      res.locals.authenticated = authenticated;
    }

    res.render("postBook", {
      title: "Upload a book | Book-Africa",
      authenticated,
    });
  } catch (error) {
    console.log(error);
  }
});

const s3 = new aws.S3({
  accessKeyId: `${process.env.AWS_ACCESS_KEY_BookStore}`,
  secretAccessKey: `${process.env.AWS_ACCESS_PASSWORD_BookStore}`,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: `${process.env.AWS_BUCKET_NAME_BookStore}`,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: async (req, file, cb) => {
      const { originalname } = file;
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
  async (req, res) => {
    const {
      BookYear,
      BookLanguage,
      BookPages,
      BookPublisher,
      BookCategory,
      BookAuthor,
      ISBN,
      BookDescription,
      BookRating,
    } = req.body;

    try {
      const newBook = new Book({});
      await Object.values(req.files.avatar).forEach((file) => {
        newBook.imagePath = file.location;
      });
      await Object.values(req.files.pdf).forEach((file) => {
        const bookName1 = file.key.replace("(z-lib.org)", "");
        const bookName2 = bookName1.replace(".pdf", "");
        const bookName = bookName2.replace(".txt", "");

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
      newBook.BookRating = BookRating;
      newBook.BookDescription = BookDescription;
      newBook.BookAuthor = BookAuthor;
      await newBook.save();

      if (newBook) {
        res.render("postBook", {
          title: "Upload a book | Book-Africa",
        });
      } else {
        console.log("error occured");
      }
      res.status(200);
    } catch (err) {
      console.log(err);
    }
  }
);

module.exports = router;
