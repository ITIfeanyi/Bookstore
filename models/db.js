const mongoose = require("mongoose");

mongoose.connect(
  `mongodb://localhost:27017/bookstore`,
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
// ${process.env.MONGO_URI}
