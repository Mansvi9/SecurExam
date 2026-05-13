import {
  useEffect,
  useState
} from "react";

import db from "../firebase/firestore";

import {
  collection,
  getDocs
} from "firebase/firestore";

import "../styles/pages/resultsDashboard.css";

function ResultsDashboard() {

  const [results,
    setResults] =
    useState([]);

  useEffect(() => {

    fetchResults();

  }, []);

  async function fetchResults() {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "results")
        );

      const data = [];

      querySnapshot.forEach((doc) => {

        data.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setResults(data);

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="results-page">

      <h1>

        Results Dashboard

      </h1>

      <div className="results-grid">

        {results.map((result) => (

          <div
            key={result.id}
            className="result-card"
          >

            <h2>

              {result.studentName}

            </h2>

            <p>

              {result.studentEmail}

            </p>

            <p>

              Score:
              {" "}
              {result.score}
              {" / "}
              {result.total}

            </p>

            <p>

              Warnings:
              {" "}
              {result.warnings}

            </p>

            <p>

              Exam ID:
              {" "}
              {result.examId}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default ResultsDashboard;