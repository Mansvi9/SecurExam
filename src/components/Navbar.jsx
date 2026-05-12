import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        SecurExam
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <Link to="/student-dashboard">
            Student
          </Link>
        </li>

        <li>
          <Link to="/admin-dashboard">
            Admin
          </Link>
        </li>

        <li>
          <Link to="/exam">
            Exam
          </Link>
        </li>

        <li>
          <Link to="/result">
            Result
          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;