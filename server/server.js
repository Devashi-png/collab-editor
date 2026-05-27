const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  console.log("User Connected");

  socket.on("send_text", (data) => {
    socket.broadcast.emit("receive_text", data);
  });

});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});