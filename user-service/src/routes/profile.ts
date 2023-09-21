import { Router } from "express";
import Profile from "../controllers/profile";
import catchAsync from "../lib/catchAsync";
import { checkToken } from "../lib/middleware";

class ProfileRoutes {
    router: Router = Router();
    controller = new Profile();

    constructor() {
        this.router.post("/update-profile", checkToken, catchAsync(this.controller.updateProfile));
    }


}

export default new ProfileRoutes().router;