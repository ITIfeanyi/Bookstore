const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");

dotenv.config();
const app = express();
const PORT = process.env.PORT;
require("./models/db");
//passport
require("./config/passport")(passport);

app.set("view engine", "ejs");
app.set("trust proxy", 1);

app.use(cors());
app.use(express.static("public"));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
