import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const FRONTEND_URL = (process.env.NODE_ENV === "development") ? "http://localhost:5173" : "/";

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", 
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

const activeSharers = new Map();

io.on("connection", (socket) => {
  process.env.NODE_ENV === "development" && console.log("A user connected", socket.id);

  socket.on('share_location', (pos) => {
    // console.log("hello from share_location", pos);
    activeSharers.set(socket.id, pos);
    // emit to everyone, including the sender
    io.emit('update_sharers', Array.from(activeSharers));
  });

  socket.on('stop_sharing', () => {
    activeSharers.delete(socket.id);
    io.emit('update_sharers', Array.from(activeSharers));
  });

  socket.on("disconnect", () => {
    activeSharers.delete(socket.id);
    io.emit('update_sharers', Array.from(activeSharers));
  });

  
});
 
export { io, app, server };