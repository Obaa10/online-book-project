import { Router } from "express";
import Auth from "../controllers/auth";
import catchAsync from "../lib/catchAsync";

class AuthRoutes {
  router: Router = Router();
  controller = new Auth();

  constructor() {
    this.router.post("/register", catchAsync(this.controller.register));
    this.router.post("/login", catchAsync(this.controller.login));
    this.router.post("/check-token", catchAsync(this.controller.checkToken));
    ;
  }


}

export default new AuthRoutes().router;