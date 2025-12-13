import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar() {
  return (
    <nav id="navbar">
      <Link to="/">Home</Link>
      <Link to="/servant">Servant</Link>
      <Link to="/teams">Teams</Link>
    </nav>
  );
}
