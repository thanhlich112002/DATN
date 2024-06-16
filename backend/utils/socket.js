const socketIo = require("socket.io");

let clients = [];

function initializeSocket(server) {
  const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected: " + socket.id);
    clients.push(socket);
    socket.emit("welcomeMessage", "xin chào client");

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clients = clients.filter((client) => client.id !== socket.id);
    });
  });

  return io;
}

function middleware(data) {
  clients.forEach((client) => {
    client.emit("middlewareMessage", data);
  });
}

module.exports = { initializeSocket, middleware };
