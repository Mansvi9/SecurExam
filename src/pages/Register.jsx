import "../styles/pages/register.css";

function Register() {
  return (
    <div className="register-page">

      <div className="register-container">

        <h1>Create Account</h1>

        <form className="register-form">

          <input
            type="text"
            placeholder="Enter Full Name"
          />

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Create Password"
          />

          <select>
            <option>Select Role</option>
            <option>Student</option>
            <option>Company</option>
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