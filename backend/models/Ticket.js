import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticket_id: { type: String, required: true, unique: true },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Closed"],
    default: "Open",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
