import { Router } from "express";
import sendController from "../controlers/sendPageControllers/sendController.js";

const chatRouter = new Router();

chatRouter.get("/private", sendController.sendChat);

export default chatRouter;
