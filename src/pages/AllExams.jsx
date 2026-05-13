import { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/pages/allExams.css";

function AllExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExams();
  }, []);

  async function fetchExams() {
    try {
      const querySnapshot = await getDocs(collection(db, "exams"));

      const examsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setExams(examsData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="all-exams-page">

      <h1 className="page-title">
        📚 Available Exams
      </h1>

      {loading ? (
        <p className="loading-text">
          Loading exams...
        </p>
      ) : exams.length === 0 ? (
        <p className="empty-text">
          No exams available right now
        </p>
      ) : (
        <div className="exam-grid">

          {exams.map((exam) => (
            <div key={exam.id} className="exam-card hover-card">

              <h2>{exam.title}</h2>

              <p>
                📘 Subject: {exam.subject || "N/A"}
              </p>

              <p>
                ⏱ Duration: {exam.duration || "N/A"} mins
              </p>

              <Link to={`/exam/${exam.id}`}>
                <button className="start-btn">
                  Start Exam 🚀
                </button>
              </Link>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AllExams;