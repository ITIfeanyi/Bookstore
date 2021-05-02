const express = require("express");
const router = express.Router();
const bookSchema = require("../models/bookSchema");

// const { ensureAuthenticated } = require("../config/auth");

// bookSchema.createMapping(function (err, mapping) {
//   if (err) {
//     console.log("error creating mapping");
//   } else {
//     console.log("Mapping created");
//   }
// });
// //SYNC the database and elasticsearch
// let stream = bookSchema.synchronize();

// stream.on("data", function () {});
// stream.on("close", function () {});
// stream.on("error", function (err) {
//   console.log(err);
// });

router.get("/", async (req, res) => {
  try {
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
  if (search_term) {
    await bookSchema.search(
      {
        query_string: { query: search_term },
      },
      (err, result) => {
        if (err) return err;
        const data = result.hits.hits.map((hit) => {
          console.log(hit);
          return hit;
        });

        // check if user is authenticated
        let authenticated = false;
        if (req.isAuthenticated()) {
          authenticated = true;
          res.locals.authenticated = authenticated;
        }

        res.render("search-result", {
          query: search_term,
          data,
          title: `BookAfrica | ${search_term}`,
          authenticated,
        });
      }
    );
  }
});

module.exports = router;
