import "../styles/pages/dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-page">

      <h1 className="dashboard-title">
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          Create Exam
        </div>

        <div className="dashboard-card">
          Manage Students
        </div>

        <div className="dashboard-card">
          AI Reports
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;