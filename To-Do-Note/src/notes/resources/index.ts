import express,{ Express, Request, Response, NextFunction } from "express";
import { NotesService } from "../service/note.service";
import { NotesController } from './../controllers/note.controllers';
import { NotesMiddleware } from "../../../utils/NotesMiddleware";

const app: Express = express();

app.use(express.json());
const notesService = new NotesService();
const notesControllers = new NotesController(notesService);
const notesMiddleware = new NotesMiddleware();

app.get("/notes", async (req: Request, res: Response) => {
    try{
        const notes = await notesControllers.getNotes();
        res.status(200).json(notes);
    }catch(error){
        console.log(error);
    }
});

app.get("/notes/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const note = await notesControllers.getNote(id);
        if(!note){
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json(note);
    }catch(error){
        console.log(error);
    }
});

app.post("/notes", async (req: Request, res: Response, next: NextFunction) => {
    try{
        notesMiddleware.use(req,res, next);
        const note = req.body;
        if(note != undefined){
            const newNote = await notesControllers.createNote(note);
            res.status(201).json(newNote);
        }
    }catch(error){
        console.error(error);
    }
});

app.put("/notes/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const note = req.body;
        const updatedNote = await notesControllers.updateNote(id, note);
        if(!updatedNote){
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json(updatedNote);
    }catch(error){
        console.log(error);
    }
});

app.delete("/notes/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await notesControllers.deleteNote(id);
        res.status(204).send();
    }catch(error){
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

