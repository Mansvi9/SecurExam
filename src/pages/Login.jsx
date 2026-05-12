import { useState } from "react";

import { useNavigate } from "react-router-dom";

import "../styles/pages/login.css";

import {
  auth,
  signInWithEmailAndPassword
} from "../firebase/auth";

import db from "../firebase/firestore";

import {
  doc,
  getDoc
} from "firebase/firestore";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap =
        await getDoc(userRef);

      if (userSnap.exists()) {

        const userData =
          userSnap.data();

        if (
          userData.role === "student"
        ) {

          navigate(
            "/student-dashboard"
          );

        }

        else if (
          userData.role === "company"
        ) {

          navigate(
            "/admin-dashboard"
          );

        }

      }

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="login-page">

      <div className="login-container">

        <h1>Login</h1>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;