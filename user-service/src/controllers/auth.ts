import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import emailValidator from "email-validator";
import { User, IUser } from "../models/user";




export default class Auth {


    register = async (req: Request, res: Response, next: NextFunction) => {

        var { email, password, name, avatar } = req.body;

        if (!email || !password) {
            throw new Error("missing password or email..");
        }
        if (!email && emailValidator.validate(email)) {
            throw new Error("invalid email");
        }
        if (password.length < 8) throw new Error("invalid password");

        let user: IUser | null = await User.findOne({ email: email });
        if (user) {
            throw new Error("email already exists");
        }

        user = await User.create({
            email: email,
            name: name,
            password: password,
            avatar: avatar,
        });

        const token = this.createToken(user);
        return { ...user, password: undefined, token };

    }



    login = async (req: Request, res: Response) => {
        var { email, password } = req.body;

        if (!email || !password) {
            throw new Error("missing password or email..");
        }
        if (!email && emailValidator.validate(email)) {
            throw new Error("invalid email");
        }
        if (password.length < 8) throw new Error("invalid password");

        let user: IUser | null = await User.findOne({ email: email });
        if (!user) {
            throw new Error("invalid email");
        }

        const token = this.createToken(user);
        return { ...user, password: undefined, token };
    }



    checkToken = async (req: Request, res: Response, next: NextFunction) => {
        var { token } = req.body;

        if (!token) {
            throw new Error("missing token...");
        }

        let user: any = jwt.verify(token, process.env.USER_JWT_KEY);
        if (user) {
            user = await User.findById(user._id);
            if (user) {
                req.user = user;
                return next();
            }
        }
        throw new Error("Invalid token ");
    }


    public createToken(user: IUser): String {
        const expiresIn = 60 * 60; // an hour
        const secret = process.env.USER_JWT_KEY;
        return jwt.sign(JSON.stringify(user), secret, { expiresIn });
    }
}
