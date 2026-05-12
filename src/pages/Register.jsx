import { useState } from "react";

import "../styles/pages/register.css";

import db from "../firebase/firestore";

import {
  doc,
  setDoc
} from "firebase/firestore";

import {
  auth,
  createUserWithEmailAndPassword
} from "../firebase/auth";

function Register() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          name: name,
          email: email,
          role: role,
          createdAt: new Date()
        }
      );

      alert("Registration Successful");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="register-page">

      <div className="register-container">

        <h1>Create Account</h1>

        <form
          className="register-form"
          onSubmit={handleRegister}
        >

          <input
            type="text"
            placeholder="Enter Full Name"
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"
            placeholder="Enter Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Create Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="">
              Select Role
            </option>

            <option value="student">
              Student
            </option>

            <option value="company">
              Company
            </option>

          </select>

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;