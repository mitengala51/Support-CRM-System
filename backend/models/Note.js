import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  ticket_id: { type: String, required: true },
  note_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);

export default Note;
