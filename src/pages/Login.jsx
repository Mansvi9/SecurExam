import "../styles/pages/login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">

        <h1>Login</h1>

        <form className="login-form">

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
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