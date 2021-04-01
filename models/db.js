const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://bookstore-20:Ld9RwdAu5YTKvOYG@cluster0.ecyvm.mongodb.net/bookstore?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    }
  )
  .then(() => {
    console.log("app connected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });
