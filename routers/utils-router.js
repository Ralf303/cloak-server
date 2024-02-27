import { Router } from "express";
import utilsController from "../controlers/utils-controller.js";

const utilRouter = new Router();

utilRouter.get("/getUser", utilsController.getUser);

export default utilRouter;
