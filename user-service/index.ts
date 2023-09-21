import express, { NextFunction, Request, Response } from 'express';
import Routes from './src/routes';


import dotenv from 'dotenv';
import  Mongoose  from './src/lib/mongoose';
dotenv.config();

const app: express.Application = express();


const port: number = 3000;



app.use(express.json());
app.use(express.urlencoded());

new Mongoose();

app.listen(port, () => {
    console.log(`TypeScript with Express http://localhost:${port}/`);
});

new Routes(app);

app.use((err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
    res.status(500).json({ error: err.message });
});
