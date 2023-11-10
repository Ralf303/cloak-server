import { Router } from "express";
import authController from "../controlers/auth-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const authRouter = new Router();

authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.post("/check", authMiddleware, authController.check);
authRouter.get("/getWords", authController.getWords);
authRouter.post("/resetPassword", authController.resetPassword);
authRouter.put("/resetPassword", authController.updatePass);

export default authRouter;
