import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Webcam from "react-webcam";

import * as faceapi
from "face-api.js";

import db from "../firebase/firestore";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import {
  auth
} from "../firebase/auth";

import "../styles/pages/exam.css";

function Exam() {

  const ADMIN_EMAILS = [
    "admin@gmail.com"
  ];

  const faceIntervalRef =
    useRef(null);

  const isTerminatedRef =
    useRef(false);

  const { examId } =
    useParams();

  const navigate =
    useNavigate();

  const webcamRef =
    useRef(null);

  const [questions,
    setQuestions] =
    useState([]);

  const [answers,
    setAnswers] =
    useState({});

  const [timeLeft,
    setTimeLeft] =
    useState(300);

  const [warningCount,
    setWarningCount] =
    useState(0);

  const [faceMessage,
    setFaceMessage] =
    useState("");

  const [isAdmin,
    setIsAdmin] =
    useState(false);

  useEffect(() => {

    fetchQuestions();

    loadModels();

    if (
      ADMIN_EMAILS.includes(
        auth.currentUser?.email
      )
    ) {

      setIsAdmin(true);

    }

    const enterFullscreen =
      async () => {

        try {

          if (
            document
              .documentElement
              .requestFullscreen
          ) {

            await document
              .documentElement
              .requestFullscreen();

          }

        } catch (err) {

          console.log(err);

        }

      };

    enterFullscreen();

  }, []);

  useEffect(() => {

    const handleFullscreenChange =
      () => {

        if (
          !document.fullscreenElement
        ) {

          if (
            isTerminatedRef.current
          ) return;

          isTerminatedRef.current =
            true;

          alert(
            "Fullscreen Exit Detected! Exam Terminated."
          );

          handleSubmitExam();

        }

      };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {

      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );

    };

  }, []);

  useEffect(() => {

    if (timeLeft <= 0) {

      handleSubmitExam();

      return;

    }

    const timer =
      setInterval(() => {

        setTimeLeft(
          (prev) =>
            prev - 1
        );

      }, 1000);

    return () =>
      clearInterval(timer);

  }, [timeLeft]);

  useEffect(() => {

    const handleVisibility =
      () => {

        if (
          document.hidden
        ) {

          alert(
            "Warning: Tab Switching Detected!"
          );

          setWarningCount(
            (prev) =>
              prev + 1
          );

        }

      };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

    };

  }, []);

  useEffect(() => {

    if (
      warningCount >= 3
    ) {

      alert(
        "Too Many Warnings! Exam Submitted."
      );

      handleSubmitExam();

    }

  }, [warningCount]);

  useEffect(() => {

    const disableRightClick =
      (e) => {

        e.preventDefault();

        alert(
          "Right Click Disabled!"
        );

      };

    document.addEventListener(
      "contextmenu",
      disableRightClick
    );

    return () => {

      document.removeEventListener(
        "contextmenu",
        disableRightClick
      );

    };

  }, []);

  useEffect(() => {

    const blockCopyPaste =
      (e) => {

        e.preventDefault();

        alert(
          "Copy/Paste Disabled!"
        );

      };

    document.addEventListener(
      "copy",
      blockCopyPaste
    );

    document.addEventListener(
      "paste",
      blockCopyPaste
    );

    return () => {

      document.removeEventListener(
        "copy",
        blockCopyPaste
      );

      document.removeEventListener(
        "paste",
        blockCopyPaste
      );

    };

  }, []);

  useEffect(() => {

    return () => {

      if (
        faceIntervalRef.current
      ) {

        clearInterval(
          faceIntervalRef.current
        );

      }

    };

  }, []);

  useEffect(() => {

    const handleKeyDown =
      (e) => {

        if (
          e.key === "F12"
        ) {

          e.preventDefault();

          alert(
            "Inspect Blocked!"
          );

        }

        if (
          e.ctrlKey &&
          e.key === "c"
        ) {

          e.preventDefault();

          alert(
            "Copy Blocked!"
          );

        }

        if (
          e.ctrlKey &&
          e.key === "v"
        ) {

          e.preventDefault();

          alert(
            "Paste Blocked!"
          );

        }

        if (
          e.ctrlKey &&
          e.key === "u"
        ) {

          e.preventDefault();

          alert(
            "View Source Blocked!"
          );

        }

        if (
          e.ctrlKey &&
          e.shiftKey &&
          e.key === "I"
        ) {

          e.preventDefault();

          alert(
            "Developer Tools Blocked!"
          );

        }

      };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

    };

  }, []);

  useEffect(() => {

    const checkCamera =
      setInterval(() => {

        if (
          webcamRef.current &&
          webcamRef.current.video
        ) {

          const video =
            webcamRef.current.video;

          if (
            video.readyState !== 4
          ) {

            alert(
              "Camera Off Detected!"
            );

            setWarningCount(
              (prev) =>
                prev + 1
            );

          }

        }

      }, 5000);

    return () =>
      clearInterval(
        checkCamera
      );

  }, []);

  async function loadModels() {

    await faceapi.nets
      .tinyFaceDetector
      .loadFromUri("/models");

    startFaceDetection();

  }

  function startFaceDetection() {

    if (
      faceIntervalRef.current
    ) return;

    faceIntervalRef.current =
      setInterval(
        async () => {

          if (
            webcamRef.current &&
            webcamRef.current.video
          ) {

            const detections =
              await faceapi.detectAllFaces(
                webcamRef.current.video,
                new faceapi.TinyFaceDetectorOptions()
              );

            if (
              detections.length === 0
            ) {

              setFaceMessage(
                "No Face Detected"
              );

              setWarningCount(
                (prev) =>
                  prev + 1
              );

            } else if (
              detections.length > 1
            ) {

              setFaceMessage(
                "Multiple Faces Detected"
              );

              setWarningCount(
                (prev) =>
                  prev + 1
              );

            } else {

              setFaceMessage(
                "Face Detected"
              );

            }

          }

        },
        5000
      );

  }

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

      querySnapshot.forEach(
        (doc) => {

          data.push({
            id: doc.id,
            ...doc.data()
          });

        }
      );

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
      [questionId]:
        option
    });

  }

  async function handleSubmitExam() {

    let score = 0;

    questions.forEach(
      (question) => {

        if (
          answers[
            question.id
          ] ===
          question.correctAnswer
        ) {

          score++;

        }

      }
    );

    await addDoc(
      collection(
        db,
        "results"
      ),
      {
        studentName:
          auth.currentUser
            ?.displayName
          || "Unknown",

        studentEmail:
          auth.currentUser
            ?.email,

        examId,

        score,

        total:
          questions.length,

        warnings:
          warningCount,

        submittedAt:
          new Date()
      }
    );

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

  async function handleDeleteExam() {

    if (!isAdmin) {

      alert(
        "Only Admin Can Delete Exam"
      );

      return;

    }

    const confirmDelete =
      window.confirm(
        "Are You Sure You Want To Delete This Exam?"
      );

    if (
      !confirmDelete
    ) return;

    try {

      const questionSnapshot =
        await getDocs(
          collection(
            db,
            "exams",
            examId,
            "questions"
          )
        );

      const deletePromises =
        [];

      questionSnapshot.forEach(
        (
          questionDoc
        ) => {

          deletePromises.push(
            deleteDoc(
              doc(
                db,
                "exams",
                examId,
                "questions",
                questionDoc.id
              )
            )
          );

        }
      );

      await Promise.all(
        deletePromises
      );

      await deleteDoc(
        doc(
          db,
          "exams",
          examId
        )
      );

      alert(
        "Exam Deleted Successfully"
      );

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Error Deleting Exam"
      );

    }

  }

  return (

    <div className="exam-page">

      <h1>
        AI Proctored Exam
      </h1>

      {
        isAdmin && (

          <button
            className="submit-btn"
            onClick={
              handleDeleteExam
            }
            style={{
              backgroundColor:
                "red",
              marginBottom:
                "20px"
            }}
          >
            Delete Exam
          </button>

        )
      }

      <h2 className="timer">

        Time Left:
        {" "}

        {
          Math.floor(
            timeLeft / 60
          )
        }

        :

        {
          String(
            timeLeft % 60
          ).padStart(
            2,
            "0"
          )
        }

      </h2>

      <h3 className="warning-text">

        Warnings:
        {" "}

        {warningCount}/3

      </h3>

      <div className="webcam-box">

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />

        <h3>
          {faceMessage}
        </h3>

      </div>

      {questions.map(
        (
          question,
          index
        ) => (

          <div
            key={
              question.id
            }
            className="question-card"
          >

            <h2>

              {index + 1}.

              {" "}

              {
                question.question
              }

            </h2>

            <div className="options">

              {
                question.options.map(
                  (
                    option
                  ) => (

                    <button
                      key={
                        option
                      }
                      className={
                        answers[
                          question.id
                        ] === option
                          ? "selected-option"
                          : ""
                      }
                      onClick={() =>
                        handleOptionSelect(
                          question.id,
                          option
                        )
                      }
                    >

                      {option}

                    </button>

                  )
                )
              }

            </div>

          </div>

        )
      )}

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