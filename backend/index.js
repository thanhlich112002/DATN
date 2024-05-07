const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

require("dotenv").config();

mongoose
  .connect(process.env.DATABASE, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", router);
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
