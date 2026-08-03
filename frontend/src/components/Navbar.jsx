import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="Navbar">
      <Link to="/" className="Brand">
        <span className="BrandDot" />
        Support CRM
      </Link>
    </header>
  );
}