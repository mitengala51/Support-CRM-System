import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
});

// Create a new ticket

export async function CreateTicket(ticketData) {
  const result = await api.post("/api/tickets", ticketData);
  return result.data;
}

// Get all tickets, optionally filtered by status and/or search term

export async function GetTickets({ status, search } = {}) {
  const result = await api.get("/api/tickets", {
    params: { status, search },
  });
  return result.data;
}

// Get a single ticket (with notes) by ticket_id

export async function GetTicket(ticket_id) {
  const result = await api.get(`/api/tickets/${ticket_id}`);
  return result.data;
}

// Update a ticket's status and/or add a note

export async function UpdateTicket(ticket_id, { status, notes }) {
  const result = await api.put(`/api/tickets/${ticket_id}`, {
    status,
    notes,
  });
  return result.data;
}

export default api;
