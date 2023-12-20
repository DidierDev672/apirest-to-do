import { NotesService } from "../service/note.service";
import { Note } from "../model/note.model";

export class NotesController {
    constructor(private readonly notesService: NotesService){}

    getNotes(): Promise<Note[]>{
        return this.notesService.getNotes();
    }

    getNote(id: string): Promise<Note[]>{
        return this.notesService.getNote(id);
    }

    createNote(note: Note): Promise<void>{
        return this.notesService.createNote(note);
    }

    updateNote(id: string, note: Note): Promise<Note[]>{
        return this.notesService.updateNote(id, note);
    }

    deleteNote(id: string): Promise<void>{
        return this.notesService.deleteNote(id);
    }
}