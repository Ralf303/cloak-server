import { Router } from "express";
import cors from "cors";
import chatRouter from "../routers/chat-routers.js";
import pageController from "../controlers/send-page-controller.js";
import authRouter from "../routers/auth-routers.js";

const indexRouter = new Router();

indexRouter.use(cors());
indexRouter.use("/chat", chatRouter);
indexRouter.use("/auth", authRouter);
indexRouter.use("/registration", pageController.sendRegistration);
indexRouter.use("/authorization", pageController.sendAuthorization);
indexRouter.use("/test", pageController.sendTest);

export default indexRouter;
