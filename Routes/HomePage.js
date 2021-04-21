const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");

const bookSchema = require("../models/bookSchema");

bookSchema.createMapping(async function (err, mapping) {
  try {
    if (err) {
      console.log("error creating mapping");
    } else {
      //SYNC the database and elasticsearch
      await bookSchema.synchronize();
      console.log("Mapping created");
    }
  } catch (error) {
    console.log(error);
  }
});

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

router.get("/search", (req, res) => {
  const search_term = req.query.q;
  if (search_term) {
    bookSchema.search(
      {
        query_string: { query: search_term },
      },
      (err, result) => {
        if (err) return err;
        const data = result.hits.hits.map((hit) => {
          return hit;
        });

        // const bookSize = (() => {
        //   if (singleBook.FileSize >= 1048576) {
        //     return (singleBook.FileSize / 1048576).toFixed(2) + "MB";
        //   }
        //   if (singleBook.FileSize >= 1024) {
        //     return (singleBook.FileSize / 1048576).toFixed(0) + "KB";
        //   }
        //   return null;
        // })();
        //check if user is authenticated
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
