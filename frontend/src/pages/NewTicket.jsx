import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CreateTicket } from "../api.js";
import Loader from "../components/Loader.jsx";
import "./NewTicket.css";

export default function NewTicket() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!form.customer_name || !form.customer_email || !form.subject || !form.description) {
      return setError("All fields are required");
    }

    try {
      setSubmitting(true);
      const result = await CreateTicket(form);
      navigate(`/tickets/${result.ticket_id}`);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="NewTicketPage">
      <Link to="/" className="BackLink">
        ← Back to tickets
      </Link>

      <h1>Create a Ticket</h1>

      <form className="TicketForm" onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <input
          type="text"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
        />

        <label>Customer Email</label>
        <input
          type="email"
          name="customer_email"
          value={form.customer_email}
          onChange={handleChange}
        />

        <label>Subject</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          rows={5}
          value={form.description}
          onChange={handleChange}
        />

        {error && <p className="ErrorText">{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? <Loader size={16} /> : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
