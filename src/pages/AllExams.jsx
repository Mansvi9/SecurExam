import {
  useEffect,
  useState
} from "react";

import db from "../firebase/firestore";

import {
  collection,
  getDocs
} from "firebase/firestore";

import {
  Link
} from "react-router-dom";

import "../styles/pages/allExams.css";

function AllExams() {

  const [exams, setExams] =
    useState([]);

  useEffect(() => {

    fetchExams();

  }, []);

  async function fetchExams() {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "exams")
        );

      const examsData = [];

      querySnapshot.forEach((doc) => {

        examsData.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setExams(examsData);

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="all-exams-page">

      <h1>

        Available Exams

      </h1>

      <div className="exam-grid">

        {exams.map((exam) => (

          <div
            key={exam.id}
            className="exam-card"
          >

            <h2>
              {exam.title}
            </h2>

            <p>
              Subject:
              {" "}
              {exam.subject}
            </p>

            <p>
              Duration:
              {" "}
              {exam.duration}
              {" "}
              mins
            </p>

            <Link
  to={`/exam/${exam.id}`}
>

  <button>

    Start Exam

  </button>

</Link>

          </div>

        ))}

      </div>

    </div>

  );

}

export default AllExams;