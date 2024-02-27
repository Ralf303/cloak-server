import { Router } from "express";
import chatControler from "../controlers/chat-controler.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const chatsRouter = new Router();

chatsRouter.get("/getMessages", chatControler.getMessages);
chatsRouter.get("/getChats", authMiddleware, chatControler.getChats);
chatsRouter.post("/createChat", authMiddleware, chatControler.newChat);
chatsRouter.put("/sendMessage", chatControler.newMessage);
chatsRouter.delete("/deleteChat", chatControler.deleteChat);

export default chatsRouter;
