import express from "express";
import cors from "cors";
import { createServer } from 'http';
import path from "path";
import { Server } from "socket.io";
import {fileURLToPath} from 'url';
import chatMessageService from "./services/chatMessage-service.js";
import chatRouter from "./routers/chat-routers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 5000;
const app = express();
const server = createServer(app);
const io = new Server(server);


app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "cloak-client")));
app.use("/chat", chatRouter)
io.on('connection', (socket) => {

  socket.on('message', (msg) => {
    chatMessageService.sendMessage(socket, msg)
  });

});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
