import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { generateMessage , locationMessage } from "./utils/messages.js";

const app = express();

const __fileName = fileURLToPath(import.meta.url);
const __dirName = dirname(__fileName);
const publicDirectory = join(__dirName, "./public");

app.use(express.static(publicDirectory));

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("new websocket connection established");

  // io.emit("newConnection","a new user joined")

  io.emit("newConnection",generateMessage("a new user joined"))

  // io.emit("message","welcome")

  // socket.emit("message", "welcome");

  socket.emit("message",generateMessage("welcome"))

socket.on("sendMessage",(msg,callback)=>{
  console.log(msg)
  // io.emit("message",msg)
  io.emit("message",generateMessage(msg))
  callback("message a received")
})

socket.on("location",(lat,lon,callback)=>{
  // socket.emit("message", `https://google.com/maps?q=${lat},${lon}`);
  socket.emit(
    "location",
    locationMessage(`https://google.com/maps?q=${lat},${lon}`)
  )
  callback("location received")
});



});

const port = 5000;

server.listen(port, () => {
  console.log(`server running on port`, port);
});
