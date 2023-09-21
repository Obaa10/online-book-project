import { Request, Response, NextFunction } from "express";


export default (action: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        action(req, res, next).catch(next)
    }
}