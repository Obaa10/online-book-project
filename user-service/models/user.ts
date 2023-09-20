import { Schema, model, connect } from "mongoose";
import emailValidator from "email-validator";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
});

userSchema.method(
  "register",
  async function register(
    email: String | null,
    password: String | null,
    name: String,
    avatar: String | null
  ) {
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
);

let User = model<IUser>("User", userSchema);
exports.User = User;
