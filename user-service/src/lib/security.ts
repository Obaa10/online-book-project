import express, { Application } from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit"; "express-rate-limit";


export default class Security {
    constructor(app: Application) {

        //app.use(cors());
        app.use(helmet());
        app.use(mongoSanitize()); // Data sanitization against NoSQL query injection

        const limiter = rateLimit({
            max: 10,
            windowMs: 60 * 60 * 1000,
            message: 'Too many requests from this IP, please try again in an hour!'
        });

        app.use(limiter);

        app.use(express.json({ limit: '10kb' }));
    }
}

export const tokenCheckLimiter = rateLimit({
    max: 60,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});