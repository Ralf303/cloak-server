import { Router } from "express";
import chatGetControlers from "../controlers/chat-controlers/chat-get-controlers.js";

const chatRouter = new Router()

chatRouter.get("/private", chatGetControlers.sendChat);

  export default chatRouter