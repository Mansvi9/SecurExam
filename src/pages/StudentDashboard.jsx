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

        <div className="card-grid upgrade-grid"></div>
        <div className="card glass hover-card"></div>
        <button className="start-btn glow-btn"></button>

      </div>

    </div>
  );
}

export default StudentDashboard;