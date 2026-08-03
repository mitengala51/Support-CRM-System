import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GetTicket, UpdateTicket } from "../api.js";
import Loader from "../components/Loader.jsx";
import "./TicketDetail.css";

export default function TicketDetail() {
  const { ticket_id } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchTicket() {
      try {
        setLoading(true);
        const data = await GetTicket(ticket_id);
        setTicket(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, [ticket_id, refresh]);

  async function handleStatusChange(e) {
    const newStatus = e.target.value;
    try {
      await UpdateTicket(ticket_id, { status: newStatus });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddNote() {
    if (!noteText.trim()) {
      return;
    }

    try {
      setSaving(true);
      await UpdateTicket(ticket_id, { notes: noteText });
      setNoteText("");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="LoadingText">
        <Loader size={24} />
      </div>
    );
  }

  if (!ticket) {
    return <p className="LoadingText">Ticket not found.</p>;
  }

  return (
    <div className="TicketDetailPage">
      <Link to="/" className="BackLink">
        ← Back to tickets
      </Link>

      <div className="TicketHeader">
        <div>
          <h1>{ticket.subject}</h1>
          <p className="TicketMeta">
            {ticket.ticket_id} · {ticket.customer_name} ({ticket.customer_email}
            )
          </p>
        </div>

        <select value={ticket.status} onChange={handleStatusChange}>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <p className="TicketDescription">{ticket.description}</p>

      <div className="NotesSection">
        <h3>Notes</h3>

        <div className="AddNote">
          <textarea
            rows={3}
            placeholder="Add a note..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button onClick={handleAddNote} disabled={saving}>
            {saving ? <Loader size={14} /> : "Add Note"}
          </button>
        </div>

        {ticket.notes.length === 0 ? (
          <p className="EmptyState">No notes yet.</p>
        ) : (
          <ul className="NotesList">
            {ticket.notes.map((n, i) => (
              <li key={i}>
                <p>{n.note_text}</p>
                <span>{new Date(n.created_at).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
