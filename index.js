const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userApiRouter = require("./src/routes/user");
const advertisementApiRouter = require("./src/routes/advertisement");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", userApiRouter, advertisementApiRouter);

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || "root";
const PasswordDB = process.env.DB_PASSWORD || "AXRHV]cy?s/4UkZ";
const NameDB = process.env.DB_NAME || "delivery_db";
const HostDB = process.env.DB_HOST || "mongodb://localhost:27017/";
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
