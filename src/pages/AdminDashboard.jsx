import "../styles/pages/dashboard.css";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {

  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">

        <div
          className="dashboard-card hover-card"
          onClick={() => navigate("/create-exam")}
        >
          Create Exam
        </div>

        <div
          className="dashboard-card hover-card"
          onClick={() => navigate("/results-dashboard")}
        >
          Results
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;