import { Response, Router, Request } from "express";
import Auth from "../controllers/auth";
import catchAsync from "../lib/catchAsync";
import { tokenCheckLimiter } from "../lib/security";
import { checkToken } from "../lib/middleware";

class AuthRoutes {
  router: Router = Router();
  controller = new Auth();

  constructor() {
    this.router.post("/check-token", [tokenCheckLimiter, checkToken], catchAsync(this.controller.checkToken));
    this.router.post("/register", catchAsync(this.controller.register));
    this.router.post("/login", catchAsync(this.controller.login));
  }


}

export default new AuthRoutes().router;