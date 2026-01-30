import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>Consultation, Design & Marketing</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}
