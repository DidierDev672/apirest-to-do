import { Note } from "../entities/Note";
import { db } from "../../infrastructure/database/FirebaseConnection";

export class NoteService {
  notes: Note[] = [];

  constructor() {}

  async createNote(note: Note): Promise<void> {
    console.log(note);
    await db.collection("notes").add({
      ...note
    });
  }

  async getAllNotes(): Promise<Note[]> {
    const notesRef = db.collection("notes");
    const snapshot = await notesRef.get();
    snapshot.forEach((doc:any) => {
      this.notes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
      });
    });
    return this.notes;
  }

  async getNotesById(id: string): Promise<Note[]> {
    const noteRef = db.collection("notes").doc(id);
    const doc = await noteRef.get();
    if(!doc.exists){
      console.log("No such document");
    }else{
      this.notes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt
      });
    }

    return this.notes;
  }

  async updateNote(id: string, note: Note): Promise<void> {
    await db.collection("notes").doc(id).set({
      note
    });
  }

  async deleteNote(id: string): Promise<void> {
    const res = await db.collection("notes").doc(id).delete();
    return res;
  }
}
