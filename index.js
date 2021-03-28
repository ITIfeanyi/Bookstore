const express = require("express");
const dotenv = require("dotenv");
const expressLayout = require("express-ejs-layouts");
dotenv.config();
const PORT = process.env.PORT;
require("./models/db");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const bookUpload = require("./Routes/PostNewBook");
const homepage = require("./Routes/HomePage");
const login = require("./Routes/login");
const register = require("./Routes/register");

app.use("/", homepage);
app.use("/", bookUpload);
app.use("/", login);
app.use("/", register);

app.listen(PORT, () => console.log(`Application runing on port ${PORT}`));
