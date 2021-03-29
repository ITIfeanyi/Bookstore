const mongoose = require("mongoose");

mongoose.connect(
  `${process.env.MONGO_URI}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log("App connected to db");
  }
);
