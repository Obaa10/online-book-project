
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export function checkToken(req: Request, res: Response, next: NextFunction) {
    var { token } = req.body;

    if (!token) {
        throw new Error("missing token...");
    }

    try {
        let user: any = jwt.verify(token, process.env.USER_JWT_KEY);

        if (user) {
            req.user = user;
            return next();
        }
    } catch (e) {
        throw new Error("Invalid token");
    }
}
