import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import db from "../firebase/firestore";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth } from "../firebase/auth";

import "../styles/pages/result.css";

function Result() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  // ---------------- FETCH RESULTS ----------------
  useEffect(() => {
    fetchResults();
  }, []);

  async function fetchResults() {
    try {
      const snapshot = await getDocs(collection(db, "results"));

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setResults(data);
    } catch (error) {
      console.log(error);
    }
  }

  // ---------------- DELETE RESULT ----------------
  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "results", id));
      setResults((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="result-page">

      <h1>📊 Exam Results</h1>

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        results.map((res) => (
          <div key={res.id} className="result-card">

            <h2>
              {res.studentName || "Unknown"}
            </h2>

            <p>📧 {res.studentEmail}</p>

            <h3>
              📘 Score: {res.score} / {res.total}
            </h3>

            <p>🆔 Exam ID: {res.examId}</p>

            <p>⚠ Warnings: {res.warnings || 0}</p>

            <button
              className="delete-btn"
              onClick={() => handleDelete(res.id)}
            >
              Delete Result
            </button>

          </div>
        ))
      )}

      <button
        className="home-btn"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>

    </div>
  );
}

export default Result;