import "../styles/pages/dashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">
        Student Dashboard
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          Upcoming Exams
        </div>

        <div className="dashboard-card">
          Results
        </div>

        <div className="dashboard-card">
          AI Monitoring
        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;