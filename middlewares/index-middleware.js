import { Router } from "express";

import pageController from "../controlers/send-page-controller.js";
import authRouter from "../routers/auth-routers.js";
import chatsRouter from "../routers/chats-router.js";
import utilRouter from "../routers/utils-router.js";

const indexRouter = new Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/chats", chatsRouter);
indexRouter.use("/utils", utilRouter);
indexRouter.use("/registration", pageController.sendRegistration);
indexRouter.use("/authorization", pageController.sendAuthorization);
indexRouter.use("/chats", pageController.sendChats);
indexRouter.use("/private", pageController.sendChat);
indexRouter.use("/secretKey", pageController.seedPhrase);
indexRouter.use("/resetPassword", pageController.sendReset);
indexRouter.use("/newPassword", pageController.sendNewPass);
indexRouter.use("/chat", pageController.sendChat);
indexRouter.use("/settings", pageController.sendSettings);
indexRouter.use("*", pageController.sendIndex);

export default indexRouter;
