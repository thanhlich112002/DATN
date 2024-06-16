const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const errorHandler = require("./utils/errorHandler");
const { initializeSocket } = require("./utils/socket"); // Import từ file socket.js

dotenv.config();

const app = express();
const server = http.createServer(app);

initializeSocket(server); // Khởi tạo socket với server

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", router);

const port = process.env.PORT || 3000;
app.use(errorHandler);

server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
