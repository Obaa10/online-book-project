import { Request, Response, NextFunction } from "express";
import { User } from "../models/user";




export default class Auth {


    updateProfile = async (req: Request) => {

        var { name, avatar } = req.body;

        let user = await User.updateOne({
            id: req.user?.id
        }, {
            name: name,
            avatar: avatar,
        });

        return { ...user };
    }
}
