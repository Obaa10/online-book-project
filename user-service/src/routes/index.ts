import { Application } from "express";
import authRoutes from "./auth";
import profileRoutes from "./profile";

export default class Routes {
  constructor(app: Application) {
    app.use("/auth", authRoutes);
    app.use("/profile", profileRoutes);

    app.get('/', (_req, _res, next) => {
      _res.send("TypeScript With Express");
    });
  }
}

