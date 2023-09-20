import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import emailValidator from "email-validator";
import { User, IUser } from "../models/user";
import TokenData from "../interfaces/token_data";
import DataStoredInToken from "../interfaces/data_stored_in_token";
import dotenv from 'dotenv';



export default class Auth {

    async register(req: Request, res: Response) {
        console.log(req.body);
        
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

        const signedData = JSON.stringify(user);
        const token = jwt.sign(signedData, process.env.USER_JWT_KEY);
        return { ...user, password: undefined, token };
    }



    async login(req: Request, res: Response) {
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

        const signedData = JSON.stringify(user);
        const token = jwt.sign(signedData, "ssss");
        return { ...user, password: undefined, token };
    }



    async checkToken(req: Request, res: Response, next: NextFunction) {
        var { token } = req.body;

        if (!token) {
            throw new Error("missing password or email..");
        }

        let user: any = jwt.verify(token, "ssss");
        if (user) {
            user = await User.findById(user._id);
            if (user) {
                req.user = user;
                return next();
            }
        }

        const signedData = JSON.stringify(user);
        return { ...user, password: undefined, token };
    }



    public createCookie(tokenData: TokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }


    public createToken(user: IUser): TokenData {
        const expiresIn = 60 * 60; // an hour
        const secret = "ssss";
        const dataStoredInToken: DataStoredInToken = {
            _id: user.id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
        };
    }
}
