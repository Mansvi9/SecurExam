import Navbar from "../components/Navbar";
import "../styles/pages/home.css";

function Home() {
  return (
    <div className="home">

      <Navbar />

      <div className="hero-section">

        <h1>SecurExam</h1>

        <p>
          AI Powered Secure Online Examination Platform
        </p>

        <div className="hero-buttons">

          <button>Get Started</button>

          <button>Learn More</button>

        </div>

      </div>

    </div>
  );
}

export default Home;