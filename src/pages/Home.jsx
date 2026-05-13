import { useNavigate } from "react-router-dom";
import "../styles/pages/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      <div className="hero-section">

        <h1>SecurExam</h1>

        <p>
          AI Powered Secure Online Examination Platform
        </p>

        <div className="hero-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;