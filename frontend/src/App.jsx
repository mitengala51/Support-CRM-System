import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import NewTicket from "./pages/NewTicket.jsx";
import TicketDetail from "./pages/TicketDetail.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewTicket />} />
          <Route path="/tickets/:ticket_id" element={<TicketDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}