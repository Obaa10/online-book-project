import { IUser } from "./src/models/user";

export {};


declare global {
    namespace NodeJS {
      interface ProcessEnv {
        [key: string]: string | undefined;
        PORT: string;
        DATABASE_URL: string;
        USER_JWT_KEY: string;
        // add more environment variables and their types here
      }
    }

    namespace Express {
      export interface Request {
         user?: IUser
      }
   }
  }