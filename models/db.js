const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGODB_URI_BookStore}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("app connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
