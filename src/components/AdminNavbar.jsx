import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";
import "../styles/components/navbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // 🔥 FIX: direct read (no state, no useEffect issue)
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      localStorage.removeItem("role");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="admin-navbar">

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

        {/* LOGGED IN */}
        {currentUser && (
          <>
            {/* USER NAME */}
            <li className="user-name">
              {currentUser.displayName || currentUser.email}
            </li>

            {/* DASHBOARD */}
            <li>
              <Link to="/admin-dashboard">
                Dashboard
              </Link>
            </li>

            <li>
                <Link to="/create-exam">
                  Create Exam
                </Link>
              </li>

            <li>
                <Link to="/all-exams">
                  Exams
                </Link>
              </li>

            {/* ROLE BASED MENU
            {role === "admin" ? (
              <li>
                <Link to="/create-exam">
                  Create Exam
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/all-exams">
                  Exams
                </Link>
              </li>
            )} */}

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

export default AdminNavbar;