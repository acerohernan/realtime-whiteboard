import express from "express";
import http from "http";
import { Server } from "socket.io";
import { config } from "dotenv";

config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/status", (req, res) => res.sendStatus(200));

io.on("connection", (socket) => {
  console.log("Client connected ", socket.id);
});

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
  console.log(`The server is listening on http://localhost:${PORT}`);
});
