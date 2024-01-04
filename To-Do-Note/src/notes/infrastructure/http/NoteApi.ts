import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import { NotesController } from "../../application/controllers/NoteController";
import { NoteService } from "../../domain/services/NoteService";

import { NotesMiddleware } from "../../../../utils/NotesMiddleware";

const app = express();

app.use(helmet());
app.use(express.json());

const noteMiddleware = new NotesMiddleware();

const noteService = new NoteService();
const noteControllers = new NotesController(noteService);

app.get("/notes", async (req: Request, res: Response) => {
    try{
        const notes = await noteControllers.getAllNotes();
        res.status(200).json(notes);
    }catch(error){
        res.status(500).send(error);
    }
});

app.get("/notes/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const note = await noteService.getNotesById(id);
        if(!note){
            res.status(404).json({ message: "Not found note" });
            return;
        }
        res.status(200).json(note);
    }catch(error){
        res.status(500).send(error);
    }
});

app.post("/notes", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const note = req.body;
        noteMiddleware.use(req, res, next);
        const newNote = await noteService.createNote(note);
        res.status(201).json(newNote);
    }catch(error){
        res.status(500).send(error);
    }
});

app.put("/notes/:id", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = req.params.id;
        const note = req.body;
        noteMiddleware.use(req, res, next);
        const updatedNote = await noteService.updateNote(id, note);

        res.status(200).json(updatedNote);
    }catch(error){
        res.status(500).send(error);
    }
});

app.delete("/notes/:id", async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        await noteService.deleteNote(id);
        res.status(204).json({message: "The notes has been successfully deleted"});
    }catch(error){
        res.status(500).send(error);
    }
});


app.listen(3000, () => console.log("Notes REST API listening on port 3000"));