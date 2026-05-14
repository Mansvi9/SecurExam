import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import db from "../firebase/firestore";

import {
  addDoc,
  collection
} from "firebase/firestore";

import "../styles/pages/createExam.css";

function CreateExam() {

  const navigate =
    useNavigate();

  const [title,
    setTitle] =
    useState("");

  const [subject,
    setSubject] =
    useState("");

  const [duration,
    setDuration] =
    useState("");

  const handleCreateExam =
    async (e) => {

      e.preventDefault();

      try {

        const docRef =
          await addDoc(
            collection(
              db,
              "exams"
            ),
            {
              title,
              subject,
              duration,
              createdAt:
                new Date()
            }
          );

        alert(
          "Exam Created Successfully"
        );

        navigate(
          `/add-question/${docRef.id}`
        );

        setTitle("");
        setSubject("");
        setDuration("");

      } catch (error) {

        console.log(error);

        alert(
          "Error Creating Exam"
        );

      }

    };

  return (

    <div className="create-exam-page">

      <div className="create-exam-container">

        <h1>

          Create Exam

        </h1>

        <form
          className="create-exam-form"
          onSubmit={
            handleCreateExam
          }
        >

          <input
            type="text"
            placeholder="Exam Title"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) =>
              setSubject(
                e.target.value
              )
            }
            required
          />

          <input
            type="number"
            placeholder="Duration In Minutes"
            value={duration}
            onChange={(e) =>
              setDuration(
                e.target.value
              )
            }
            required
          />

          <button
            type="submit"
          >

            Create Exam

          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateExam;