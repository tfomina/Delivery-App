const express = require("express");
const cors = require("cors");

const userApiRouter = require("./src/routes/user");
const advertisementApiRouter = require("./src/routes/advertisement");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api", userApiRouter, advertisementApiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
