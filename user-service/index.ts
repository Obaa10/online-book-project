// Import the express in typescript file
import express, { NextFunction, Request, Response } from 'express';
import Routes from './src/routes';


import dotenv from 'dotenv';
dotenv.config();

// Initialize the express engine
const app: express.Application = express();


// Take a port 3000 for running server.
const port: number = 3000;



app.use(express.json());             // for application/json
app.use(express.urlencoded());

// Handling '/' Request
app.get('/', (_req, _res, next) => {
    next(new Error("Missing tdata"));
    _res.send("TypeScript With Express");
});




// Server setup
app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
});
try { } catch (e) {
    console.log(e);
}
new Routes(app);

app.use((err: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
    // Set the status code and error message
    res.status(500).json({ error: err.message });
});
