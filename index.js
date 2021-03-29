const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
dotenv.config();
const PORT = process.env.PORT;
require("./models/db");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: `${process.env.SESSION_SECRET}`,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const bookUpload = require("./Routes/PostNewBook");
const homepage = require("./Routes/HomePage");
const login = require("./Routes/login");
const register = require("./Routes/register");
const singleBook = require("./Routes/signleBook");

app.use("/", homepage);
app.use("/", bookUpload);
app.use("/", login);
app.use("/", register);
app.use("/", singleBook);

app.listen(PORT, () => console.log(`Application runing on port ${PORT}`));
