const express = require("express");
const algoliasearch = require("algoliasearch");
const router = express.Router();
const bookSchema = require("../models/bookSchema");
const client = algoliasearch("XSCYCIGR8N", "09de26dfb0f4dc73ff8f1307405beeea");
const index = client.initIndex("BookAfrica");

const uploadToAlgolia = async () => {
  const books = await bookSchema.find({});
  const singleBook = books.map((book) => {
    return {
      objectID: book._id,
      BookTitle: book.BookTitle,
      BookAuthor: book.BookAuthor,
      BookPublisher: book.BookPublisher,
      imagePath: book.imagePath,
      BookYear: book.BookYear,
      BookLanguage: book.bookBookLanguage,
      BookFieldName: book.BookFieldName,
      FileSize: book.FileSize,
    };
  });
  index.saveObjects(singleBook);
};

// const { ensureAuthenticated } = require("../config/auth");

router.get("/", async (req, res) => {
  try {
    // upload books to algolia
    uploadToAlgolia();

    //Popular books
    let books = await bookSchema.find().where("BookRating").gte(4);
    res.locals.books = books;

    //you might be interested in::
    let lessPopularBooks = await bookSchema.find().lte("BookRating", 3);
    res.locals.lessPopularBooks = lessPopularBooks;

    //check if user is authenticated
    let authenticated = false;
    if (req.isAuthenticated()) {
      authenticated = true;
      res.locals.authenticated = authenticated;
    }
    res.render("homepage", {
      title: "Home | Book-Africa",
      authenticated,
    });
  } catch (err) {
    console.log(err);
  }
});

//search
router.post("/search", (req, res) => {
  res.redirect("/search?q=" + req.body.q);
});

router.get("/search", async (req, res) => {
  const search_term = req.query.q;
  // check if user is authenticated
  let authenticated = false;
  if (req.isAuthenticated()) {
    authenticated = true;
    res.locals.authenticated = authenticated;
  }
  index
    .search(`${search_term}`)
    .then(({ hits }) => {
      res.render("search-result", {
        query: search_term,
        data: hits,
        title: `BookAfrica | ${search_term}`,
        authenticated,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // if (search_term) {
  //   await bookSchema.search(
  //     {
  //       query_string: { query: search_term },
  //     },
  //     (err, result) => {
  //       if (err) return err;
  //       const data = result.hits.hits.map((hit) => {
  //         console.log(hit);
  //         return hit;
  //       });

  //       // check if user is authenticated
  //       let authenticated = false;
  //       if (req.isAuthenticated()) {
  //         authenticated = true;
  //         res.locals.authenticated = authenticated;
  //       }

  //       res.render("search-result", {
  //         query: search_term,
  //         data,
  //         title: `BookAfrica | ${search_term}`,
  //         authenticated,
  //       });
  //     }
  //   );
  // }
});

module.exports = router;
