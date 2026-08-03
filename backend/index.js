import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import Ticket from "./models/Ticket.js";
import Note from "./models/Note.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log("DB Error: ", err);
  });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Function to generate the next Ticket ID (e.g. TKT-001, TKT-002...)

async function GenerateTicketId() {
  const count = await Ticket.countDocuments();
  const nextNumber = count + 1;
  return `TKT-${String(nextNumber).padStart(3, "0")}`;
}

// EndPoint to Create a Ticket

app.post("/api/tickets", async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket_id = await GenerateTicketId();

    const ticket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
    });

    res.status(201).json({
      ticket_id: ticket.ticket_id,
      created_at: ticket.created_at,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// EndPoint to List All Tickets (supports ?status= and ?search=)

app.get("/api/tickets", async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { customer_name: regex },
        { customer_email: regex },
        { ticket_id: regex },
        { subject: regex },
        { description: regex },
      ];
    }

    const tickets = await Ticket.find(query).sort({ created_at: -1 });

    res.json(
      tickets.map((t) => ({
        ticket_id: t.ticket_id,
        customer_name: t.customer_name,
        subject: t.subject,
        status: t.status,
        created_at: t.created_at,
      }))
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// EndPoint to Get a Single Ticket + its Notes

app.get("/api/tickets/:ticket_id", async (req, res) => {
  try {
    const { ticket_id } = req.params;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const notes = await Note.find({ ticket_id }).sort({ created_at: -1 });

    res.json({
      ticket_id: ticket.ticket_id,
      customer_name: ticket.customer_name,
      customer_email: ticket.customer_email,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// EndPoint to Update Status / Add a Note

app.put("/api/tickets/:ticket_id", async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const { status, notes } = req.body;

    const ticket = await Ticket.findOne({ ticket_id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (status) {
      ticket.status = status;
    }

    ticket.updated_at = Date.now();
    await ticket.save();

    if (notes) {
      await Note.create({ ticket_id, note_text: notes });
    }

    res.json({ success: true, updated_at: ticket.updated_at });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is Listening on port ${process.env.PORT || 5000}`);
});
