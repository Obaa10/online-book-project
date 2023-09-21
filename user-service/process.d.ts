import { IUser } from "./src/models/user";
import { Request, Express } from "express";

export { };


declare global {

  namespace Express {
    export interface Request {
      user?: IUser
    }
  }
}



declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      DATABASE: string;
      DATABASE_PASSWORD: string;
      USER_JWT_KEY: string;
      // add more environment variables and their types here
    }
  }
}




