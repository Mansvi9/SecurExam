import { useEffect, useState } from "react";
import db from "../firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../firebase/auth";

import "../styles/pages/resultsDashboard.css";

function ResultsDashboard() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  }, []);

  async function fetchResults() {
    try {
      const q = query(
        collection(db, "results"),
        where("studentEmail", "==", auth.currentUser?.email)
      );

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResults(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="results-page">

      <h1>📊 Your Results</h1>

      {results.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className="results-grid">

          {results.map((result) => (
            <div key={result.id} className="result-card">

              <h2>{result.studentName}</h2>

              <p>📧 {result.studentEmail}</p>

              <p>📘 Score: {result.score} / {result.total}</p>

              <p>⚠ Warnings: {result.warnings}</p>

              <p>🆔 Exam ID: {result.examId}</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default ResultsDashboard;