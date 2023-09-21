import { Application } from "express";
import authRoutes from "./auth";
import profileRoutes from "./profile";

export default class Routes {
  constructor(app: Application) {
    app.use("/auth", authRoutes);
    app.use("/profile", profileRoutes);
  }
}

