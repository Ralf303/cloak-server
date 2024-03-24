import { Router } from "express";
import utilsController from "../controlers/utils-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const utilRouter = new Router();

utilRouter.get("/getUser", utilsController.getUser);
utilRouter.put("/changePassword", authMiddleware, utilsController.changePass);
utilRouter.get("/checkPrivacy", utilsController.checkPrivate);

export default utilRouter;
