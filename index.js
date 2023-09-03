import express from "express";
import cors from "cors";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import chatService from "./services/chatMessage-service.js";
import chatRouter from "./routers/chat-routers.js";
import sendController from "./controlers/sendPageControllers/sendController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 80;
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "cloak-client")));
app.use("/chat", chatRouter);
app.use("/registration", sendController.sendRegistration);
app.use("/authorization", sendController.sendAuthorization);

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    chatService.sendMessage(socket, msg);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
