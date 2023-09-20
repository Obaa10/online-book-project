import { Application } from "express";
import authRoutes from "./auth";

export default class Routes {
  constructor(app: Application) {
    app.use("/auth", authRoutes);
  }
}

