import { useEffect, useState } from "react";

import Webcam from "react-webcam";

import "../styles/pages/exam.css";

function Exam() {

  const [warnings, setWarnings] =
    useState(0);

  useEffect(() => {

    const enterFullscreen = async () => {

      if (
        document.documentElement
          .requestFullscreen
      ) {

        await document
          .documentElement
          .requestFullscreen();

      }

    };

    enterFullscreen();

  }, []);

  useEffect(() => {

    const handleVisibility =
      () => {

        if (document.hidden) {

          alert(
            "Tab Switching Detected!"
          );

          setWarnings(
            (prev) => prev + 1
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

  return (

    <div className="exam-page">

      <div className="exam-header">

        <h1>

          AI Proctored Exam

        </h1>

        <h2>

          Warnings: {warnings}

        </h2>

      </div>

      <div className="exam-container">

        <div className="webcam-section">

          <Webcam />

        </div>

        <div className="question-section">

          <h3>
            What is Artificial Intelligence?
          </h3>

          <div className="options">

            <button>
              Option A
            </button>

            <button>
              Option B
            </button>

            <button>
              Option C
            </button>

            <button>
              Option D
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Exam;