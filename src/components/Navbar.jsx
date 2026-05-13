import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import "../styles/components/navbar.css";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [role, setRole] = useState(null);

  // 🔐 Get role from storage (you can later replace with Firebase fetch)
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {
      await signOut(auth);

      // clear role on logout
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">

      {/* LOGO */}
      <div className="logo">
        SecurExam
      </div>

      <ul className="nav-links">

        {/* HOME */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {/* NOT LOGGED IN */}
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

        {/* LOGGED IN USER */}
        {currentUser && (
          <>
            {/* DASHBOARD */}
            <li>
              <Link to="/student-dashboard">
                Dashboard
              </Link>
            </li>

            {/* EXAMS (ALL USERS) */}
            <li>
              <Link to="/all-exams">
                Exams
              </Link>
            </li>

            {/* 👨‍🏫 ADMIN ONLY */}
            {role === "admin" && (
              <li>
                <Link to="/create-exam">
                  Create Exam
                </Link>
              </li>
            )}

            {/* RESULTS */}
            <li>
              <Link to="/results-dashboard">
                Results
              </Link>
            </li>

            {/* LOGOUT */}
            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;