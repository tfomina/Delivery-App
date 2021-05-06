require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

const { userApiRouter, advertisementApiRouter } = require("./src/routes");

const { notFoundMiddleware } = require("./src/middleware");
const passport = require("./src/passport/setup");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/user", userApiRouter);
app.use("/advertisement", advertisementApiRouter);

app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || "root";
const PasswordDB = process.env.DB_PASSWORD || "AXRHV]cy?s/4UkZ";
const NameDB = process.env.DB_NAME || "delivery_db";
const start = async () => {
  try {
    const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.m4q9c.mongodb.net/${NameDB}?retryWrites=true&w=majority`;
    await mongoose.connect(encodeURI(UrlDB), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
