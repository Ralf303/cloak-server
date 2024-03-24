import express from "express";
import path from "path";
import cors from "cors";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import http from "http";
import https from "https";
import { Server } from "socket.io";
import chatService from "./services/chatMessage-service.js";
import dbService from "./services/db-service.js";
import indexRouter from "./middlewares/index-middleware.js";
config({
  path: process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
});

const PORT = process.env.SERVER_PORT || 80;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let server;

if (process.env.SERVER_PORT) {
  const options = {
    key: fs.readFileSync(process.env.SECRET_KEY),
    cert: fs.readFileSync(process.env.SERTIFICATE),
  };
  server = https.createServer(options, app);
} else {
  server = http.createServer(app);
}

const io = new Server(server);

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

    socket.on("delete", (msg) => {
      chatService.deleteChat(socket, msg);
    });

    socket.on("changePrivate", async (msg) => {
      await dbService.changeUserPrivate(msg);
    });
  });

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
