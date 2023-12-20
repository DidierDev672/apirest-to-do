import { Note } from "../model/note.model";
import { db } from "../../../connection/FirebaseConnection";
import { logger, LEVEL_INFO, LEVEL_ERROR } from "../../../utils/logger";

export class NotesService {
  //constructor(private logging: Logger){}
  async getNotes(): Promise<Note[]> {
    let notes: Note[] = [];
    const notesRef = db.collection("notes");
    const snapshot = await notesRef.get();
    snapshot.forEach((doc: any) => {
      notes.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
      });
    });
    return notes;
  }

  async getNote(id: string): Promise<Note[]> {
    let note: Note[] = [];
    const noteRef = db.collection("notes").doc(id);
    const doc = await noteRef.get();
    if (!doc.exists) {
      logger("No such document", LEVEL_INFO);
    } else {
      note.push({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
        createdAt: doc.data().createdAt,
        updatedAt: doc.data().updatedAt,
      });
    }
    return note;
  }

  async createNote(note: Note): Promise<void> {
    try {
      const res = await db.collection("notes").add(note);
      if (!res) {
        logger("No documents found", LEVEL_INFO);
      }
    } catch (error) {
      logger("Error message: ", LEVEL_ERROR);
      console.log(error);
    }
  }

  async updateNote(id: string, note: Note): Promise<Note[]> {
    const res = await db
      .collection("notes")
      .doc(id)
      .update(note);
    if (!res) {
      logger("Cannot update document", LEVEL_INFO);
    }
    return res;
  }

  async deleteNote(id: string): Promise<void> {
    const res = await db
      .collection("notes")
      .doc(id)
      .delete();
    return res;
  }
}
