const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

dotenv.config();
const PORT = process.env.PORT;
require("./models/db");

const app = express();

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(express.static("public"));
app.use(
  cookieSession({
    name: "sessionID",
    secret: `${process.env.SESSION_SECRET_BookStore}`,
    keys: ["key1", "key2"],
    maxAge: 60 * 1000 * 60 * 24 * 2,
    cookie: {
      httpOnly: true,
    },
  })
);
app.use(cookieParser("keyboard cat"));
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

const bookUpload = require("./Routes/PostNewBook");
const homepage = require("./Routes/HomePage");
const login = require("./Routes/login");
const register = require("./Routes/register");
const singleBook = require("./Routes/signleBook");

app.get("/", (req, res) => {
  res.send("hello world");
});
// app.use("/", homepage);
// app.use("/", bookUpload);
// app.use("/", login);
// app.use("/", register);
// app.use("/", singleBook);

app.listen(PORT, () => console.log(`Application runing on port ${PORT}`));
