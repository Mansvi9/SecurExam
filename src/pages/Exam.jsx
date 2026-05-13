import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

import db from "../firebase/firestore";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { auth } from "../firebase/auth";

import "../styles/pages/exam.css";

function Exam() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const webcamRef = useRef(null);
  const faceIntervalRef = useRef(null);
  const isSubmittingRef = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300);
  const [faceMessage, setFaceMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH QUESTIONS ----------------
  useEffect(() => {
    fetchQuestions();
    loadModels();
  }, [examId]);

  async function fetchQuestions() {
    try {
      const snapshot = await getDocs(
        collection(db, "exams", examId, "questions")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // ---------------- FULLSCREEN ----------------
  useEffect(() => {
    const enterFullscreen = async () => {
      try {
        await document.documentElement.requestFullscreen();
      } catch (err) {
        console.log(err);
      }
    };

    enterFullscreen();
  }, []);

  useEffect(() => {
    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        handleSubmitExam();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreen);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreen);
    };
  }, []);

  // ---------------- TAB SWITCH ----------------
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        handleSubmitExam();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // ---------------- KEY BLOCK ----------------
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u") ||
        (e.ctrlKey && e.key === "c") ||
        (e.ctrlKey && e.key === "v")
      ) {
        e.preventDefault();
        handleSubmitExam();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ---------------- RIGHT CLICK ----------------
  useEffect(() => {
    const block = (e) => {
      e.preventDefault();
      handleSubmitExam();
    };

    document.addEventListener("contextmenu", block);

    return () => {
      document.removeEventListener("contextmenu", block);
    };
  }, []);

  // ---------------- CAMERA CHECK ----------------
  useEffect(() => {
    const check = setInterval(() => {
      if (webcamRef.current?.video) {
        const video = webcamRef.current.video;

        if (video.readyState !== 4) {
          handleSubmitExam();
        }
      }
    }, 5000);

    return () => clearInterval(check);
  }, []);

  // ---------------- FACE API ----------------
  async function loadModels() {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    startFaceDetection();
  }

  function startFaceDetection() {
    if (faceIntervalRef.current) return;

    faceIntervalRef.current = setInterval(async () => {
      if (!webcamRef.current?.video) return;

      const detections = await faceapi.detectAllFaces(
        webcamRef.current.video,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length === 0 || detections.length > 1) {
        setFaceMessage("Face Issue Detected");
        handleSubmitExam();
      } else {
        setFaceMessage("Face Detected");
      }
    }, 5000);
  }

  // ---------------- ANSWERS ----------------
  function handleOptionSelect(questionId, option) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  }

  // ---------------- SUBMIT (SAFE LOCK) ----------------
  async function handleSubmitExam() {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      let score = 0;

      questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) {
          score++;
        }
      });

      await addDoc(collection(db, "results"), {
        studentName: auth.currentUser?.displayName || "Unknown",
        studentEmail: auth.currentUser?.email || "Unknown",
        examId,
        score,
        total: questions.length,
        submittedAt: new Date(),
      });

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      navigate("/result", {
        state: { score, total: questions.length },
      });
    } catch (err) {
      console.log(err);
    }
  }

  // ---------------- UI ----------------
  if (loading) {
    return <h2 className="exam-page">Loading Exam...</h2>;
  }

  return (
    <div className="exam-page">
      <h1>AI Proctored Exam</h1>

      <h2 className="timer">
        Time Left: {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(2, "0")}
      </h2>

      <h3>{faceMessage}</h3>

      <div className="webcam-box">
        <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>

      {questions.map((q, index) => (
        <div key={q.id} className="question-card">
          <h2>
            {index + 1}. {q.question}
          </h2>

          <div className="options">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleOptionSelect(q.id, opt)}
                className={
                  answers[q.id] === opt ? "selected-option" : ""
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmitExam}>
        Submit Exam
      </button>
    </div>
  );
}

export default Exam;