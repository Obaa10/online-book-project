import { Schema, model, connect } from "mongoose";

export interface IUser {
  id: string;
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


export let User = model<IUser>("User", userSchema);
export default User;
