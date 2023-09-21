import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import bcrypt from "bcrypt";
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
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);


        user = await User.create({
            email: email,
            name: name,
            password: hashedPassword,
            avatar: avatar,
        });

        const token = this.createToken(user);
        user.password = "";
        res.status(201).json({ user, password: undefined, token });
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
            throw new Error("invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("invalid email or password");
        }

        const token = this.createToken(user);
        user.password = "";
        res.status(201).json({ user, password: undefined, token });
    }

    checkToken = async (req: Request, res: Response) => {
        res.status(200).json()
    }

    public createToken(user: IUser): String {
        const expiresIn = 60 * 60; // an hour
        //,{ expiresIn: expiresIn }
        const secret = process.env.USER_JWT_KEY;
        return jwt.sign(JSON.stringify(user), secret);
    }
}
