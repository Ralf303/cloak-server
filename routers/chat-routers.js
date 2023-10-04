import { Router } from "express";
import sendController from "../controlers/send-page-controller.js";

const chatRouter = new Router();

chatRouter.get("/private", sendController.sendChat);

export default chatRouter;
