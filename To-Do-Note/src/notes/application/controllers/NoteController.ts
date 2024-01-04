import { Note } from "../../domain/entities/Note";
import { NoteService } from "../../domain/services/NoteService";

export class NotesController {
    constructor(private readonly noteService: NoteService){}
    getAllNotes(): Promise<Note[]>{
        const notes = this.noteService.getAllNotes();
        return notes;
    }

    getNoteById(id: string): Promise<Note[]>{
        return this.noteService.getNotesById(id);
    }

    createNote(note: Note):void{
        try{
            this.noteService.createNote(note);
        }catch(error){
            console.error(error);
        }
    }

    updateNote(id: string, note: Note):void{
        this.noteService.updateNote(id, note);
    }

    deleteNote(id: string):Promise<void>{
        return this.noteService.deleteNote(id);
    }
}