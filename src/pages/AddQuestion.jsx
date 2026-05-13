import {
  useState
} from "react";

import {
  useParams
} from "react-router-dom";

import db from "../firebase/firestore";

import {
  addDoc,
  collection
} from "firebase/firestore";

import "../styles/pages/addQuestion.css";

function AddQuestion() {

  const { examId } =
    useParams();

  const [question, setQuestion] =
    useState("");

  const [option1, setOption1] =
    useState("");

  const [option2, setOption2] =
    useState("");

  const [option3, setOption3] =
    useState("");

  const [option4, setOption4] =
    useState("");

  const [correctAnswer,
    setCorrectAnswer] =
    useState("");

  async function handleAddQuestion(e) {

    e.preventDefault();

    try {

      await addDoc(
        collection(
          db,
          "exams",
          examId,
          "questions"
        ),
        {
          question,
          options: [
            option1,
            option2,
            option3,
            option4
          ],
          correctAnswer
        }
      );

      alert(
        "Question Added"
      );

      setQuestion("");
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setCorrectAnswer("");

    } catch (error) {

      console.log(error);

    }

  }

  return (

    <div className="add-question-page">

      <div className="add-question-container">

        <h1>

          Add Question

        </h1>

        <form
          className="add-question-form"
          onSubmit={handleAddQuestion}
        >

          <input
            type="text"
            placeholder="Question"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Option 1"
            value={option1}
            onChange={(e) =>
              setOption1(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Option 2"
            value={option2}
            onChange={(e) =>
              setOption2(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Option 3"
            value={option3}
            onChange={(e) =>
              setOption3(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Option 4"
            value={option4}
            onChange={(e) =>
              setOption4(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Correct Answer"
            value={correctAnswer}
            onChange={(e) =>
              setCorrectAnswer(
                e.target.value
              )
            }
          />

          <button type="submit">

            Add Question

          </button>

        </form>

      </div>

    </div>

  );

}

export default AddQuestion;