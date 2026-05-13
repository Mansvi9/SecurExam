import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import db from "../firebase/firestore";

import {
  collection,
  getDocs
} from "firebase/firestore";

import "../styles/pages/exam.css";

function Exam() {

  const { examId } =
    useParams();

  const navigate =
    useNavigate();

  const [questions,
    setQuestions] =
    useState([]);

  const [answers,
    setAnswers] =
    useState({});

  const [timeLeft,
  setTimeLeft] =
  useState(300);

  useEffect(() => {

    fetchQuestions();

  }, []);

  useEffect(() => {

  if (timeLeft <= 0) {

    handleSubmitExam();

    return;

  }

  const timer =
    setInterval(() => {

      setTimeLeft(
        (prev) => prev - 1
      );

    }, 1000);

  return () =>
    clearInterval(timer);

}, [timeLeft]);

  async function fetchQuestions() {

    try {

      const querySnapshot =
        await getDocs(
          collection(
            db,
            "exams",
            examId,
            "questions"
          )
        );

      const data = [];

      querySnapshot.forEach((doc) => {

        data.push({
          id: doc.id,
          ...doc.data()
        });

      });

      setQuestions(data);

    } catch (error) {

      console.log(error);

    }

  }

  function handleOptionSelect(
    questionId,
    option
  ) {

    setAnswers({
      ...answers,
      [questionId]: option
    });

  }

  function handleSubmitExam() {

    let score = 0;

    questions.forEach((question) => {

      if (
        answers[question.id]
        ===
        question.correctAnswer
      ) {

        score++;

      }

    });

    navigate(
      "/result",
      {
        state: {
          score,
          total:
          questions.length
        }
      }
    );

  }

  return (

    <div className="exam-page">

      <h1>

        Exam

      </h1>

      <h2 className="timer">

  Time Left:
  {" "}
  {Math.floor(timeLeft / 60)}
  :
  {String(timeLeft % 60)
    .padStart(2, "0")}

</h2>

      {questions.map((question,
        index) => (

        <div
          key={question.id}
          className="question-card"
        >

          <h2>

            {index + 1}.
            {" "}
            {question.question}

          </h2>

          <div className="options">

            {question.options.map(
              (option) => (

              <button
                key={option}
                onClick={() =>
                  handleOptionSelect(
                    question.id,
                    option
                  )
                }
              >

                {option}

              </button>

            ))}

          </div>

        </div>

      ))}

      <button
        className="submit-btn"
        onClick={
          handleSubmitExam
        }
      >

        Submit Exam

      </button>

    </div>

  );

}

export default Exam;