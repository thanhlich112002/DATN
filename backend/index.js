const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const http = require("http");
const cors = require("cors");
require("dotenv").config();
const errorHandler = require("./utils/errorHandler");

mongoose
  .connect(process.env.DATABASE, {})
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
const app = express();
const server = http.createServer(app);

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
let clients = [];

socketIo.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clients = clients.filter((client) => client.id !== socket.id);
  });
});
function sendNotification(message) {
  clients.forEach((client) => {
    client.emit("serverNotification", message);
  });
}
module.exports = { sendNotification };

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/", router);
const port = process.env.PORT;
app.use(errorHandler);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;
