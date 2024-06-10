const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./utils/errorHandler");

mongoose
  .connect(
    "mongodb+srv://ThanhLich:thanhlich@thanhlich.vk4rcrb.mongodb.net/DATN?retryWrites=true&w=majority&appName=ThanhLich",
    {}
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", router);
const port = process.env.PORT;
app.use(errorHandler);
const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
