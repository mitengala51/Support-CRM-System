import { Link } from "react-router-dom";
import "./TicketList.css";

const statusClass = {
  Open: "badge badge-open",
  "In Progress": "badge badge-progress",
  Closed: "badge badge-closed",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function TicketList({ tickets }) {

  if (tickets.length === 0) {
    return (
      <div className="EmptyState">
        <p>No tickets found</p>
        <span>Try adjusting your search or filter.</span>
      </div>
    );
  }

  return (
    <div className="TicketTableWrap">
      <table className="TicketTable">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.ticket_id}>
              <td>
                <Link to={`/tickets/${t.ticket_id}`} className="CustomerCell">
                  <span className="Avatar">{getInitials(t.customer_name)}</span>
                  <span className="CustomerInfo">
                    <span className="CustomerName">{t.customer_name}</span>
                    <span className="TicketIdText">{t.ticket_id}</span>
                  </span>
                </Link>
              </td>
              <td>
                <Link to={`/tickets/${t.ticket_id}`}>{t.subject}</Link>
              </td>
              <td>
                <span className={statusClass[t.status]}>{t.status}</span>
              </td>
              <td className="DateCell">
                {new Date(t.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}