import { Request, Response, NextFunction } from "express";

export class NotesMiddleware {
    public use(req: Request, res: Response, next: NextFunction){
        if(req.body.title.length < 10){
            res.status(400).send("The title of the note must be at least 10 characters");
            return;
        }

        req.body.createdAt = new Date();
        req.body.updatedAt = new Date();

        console.log(`Request for notes: ${JSON.stringify(req.body)}`);

        next();
    }
};