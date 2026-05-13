import { Link, useNavigate } from "react-router-dom";

import { auth, signOut } from "../firebase/auth";

import { useAuth } from "../context/AuthContext";

import "../styles/components/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
      return;
    }

    try {
      await signOut(auth);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">SecurExam</div>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        {!currentUser && (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}

        {currentUser && (
          <>
            <li>
              <Link to="/student-dashboard">Dashboard</Link>
            </li>

            <li>
              <Link to="/create-exam">Create Exam</Link>
            </li>

            <li>

  <Link
    to="/results-dashboard"
  >

    Results

  </Link>

</li>

            <li>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>

            <li>

  <Link to="/all-exams">

    Exams

  </Link>

</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
