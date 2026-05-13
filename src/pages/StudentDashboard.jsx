import { useNavigate } from "react-router-dom";
import "../styles/pages/dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">
        Student Dashboard
      </h1>

      <div className="dashboard-cards">

        <div
          className="dashboard-card hover-card"
          onClick={() => navigate("/all-exams")}
        >
          Upcoming Exams
        </div>

        <div
          className="dashboard-card hover-card"
          onClick={() => navigate("/results-dashboard")}
        >
          Results
        </div>

        <div
          className="dashboard-card hover-card"
          onClick={() => navigate("/ai-monitoring")}
        >
          AI Monitoring
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;