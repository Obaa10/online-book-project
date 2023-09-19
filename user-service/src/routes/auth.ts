import express, { Router } from "express";
import Auth from "../controllers/auth";

class HomeRoutes {
  router: Router = express.Router();
  controller = new Auth();

  constructor() {
    this.router.post("/register", this.controller.register);
    this.router.post("/login", this.controller.register);
    this.router.post("/check-token", this.controller.register);
  }


}

export default new HomeRoutes().router;