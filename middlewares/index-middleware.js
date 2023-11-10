import { Router } from "express";

import chatRouter from "../routers/chat-routers.js";
import pageController from "../controlers/send-page-controller.js";
import authRouter from "../routers/auth-routers.js";

const indexRouter = new Router();

indexRouter.use("/chat", chatRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/registration", pageController.sendRegistration);
indexRouter.use("/authorization", pageController.sendAuthorization);
indexRouter.use("/test", pageController.sendTest);
indexRouter.use("/secretKey", pageController.seedPhrase);
indexRouter.use("/resetPassword", pageController.sendReset);
indexRouter.use("/newPassword", pageController.sendNewPass);

export default indexRouter;
