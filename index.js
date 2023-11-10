import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import chatService from "./services/chatMessage-service.js";
import dbService from "./services/db-service.js";
import indexRouter from "./middlewares/index-middleware.js";

const PORT = 80;
const app = express();
const server = createServer(app);
const io = new Server(server);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "cloak-client")));
app.use(indexRouter);

const start = () => {
  dbService.connect();

  io.on("connection", (socket) => {
    socket.on("message", (msg) => {
      chatService.sendMessage(socket, msg);
    });
  });

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
