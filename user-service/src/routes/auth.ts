import { Router } from "express";
import Auth from "../controllers/auth";
import catchAsync from "../lib/errors/catchAsync";

class HomeRoutes {
  router: Router = Router();
  controller = new Auth();

  constructor() {
    this.router.post("/register", catchAsync(this.controller.register));
    this.router.post("/login", catchAsync(this.controller.login));
    this.router.post("/login", catchAsync(this.controller.register));
    ;
  }


}

export default new HomeRoutes().router;