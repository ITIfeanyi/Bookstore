const mongoose = require("mongoose");

mongoose
  .connect(`${process.env.MONGO_URI}`, {
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
