import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchFilterBar from "../components/SearchFilterBar.jsx";
import TicketList from "../components/TicketList.jsx";
import { GetTickets } from "../api.js";
import "./Home.css";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTickets() {
      try {
        setLoading(true);
        const data = await GetTickets({ status, search });
        setTickets(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    // Debounce search so we're not hitting the API on every keystroke
    const timer = setTimeout(fetchTickets, 300);
    return () => clearTimeout(timer);
  }, [search, status]);

  return (
    <div className="HomePage">
      <div className="HomeHeader">
        <div>
          <h1>Support Tickets</h1>
          <p className="HomeSubtitle">
            {tickets.length} ticket{tickets.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link to="/new" className="NewTicketButton">
          + New Ticket
        </Link>
      </div>

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {loading ? (
        <>
          <div className="SkeletonRow" />
          <div className="SkeletonRow" />
          <div className="SkeletonRow" />
        </>
      ) : (
        <TicketList tickets={tickets} />
      )}
    </div>
  );
}
