
import { Request, Response, NextFunction } from "express";
import authController from "./../controllers/auth"


export function checkToken(req: Request, res: Response, next: NextFunction) {
    return new authController().checkToken(req, res, next);
}
