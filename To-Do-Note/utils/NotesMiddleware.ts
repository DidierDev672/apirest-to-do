import { Request, Response, NextFunction } from "express";

export class NotesMiddleware {
    public use(req: Request, res: Response, next: NextFunction){
        req.body.createdAt = new Date();
        req.body.updatedAt = new Date();

        console.log(`Request for notes: ${JSON.stringify(req.body)}`);
        res.status(200).json(req.body);
        next();
    }
};