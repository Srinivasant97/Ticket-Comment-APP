import "../App.css";
import { useState } from "react";
import { logIn } from "../services/loginService";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = {
      name: user,
      email,
    };
    const response = await logIn(body);
    console.log(response);
    setUser("");
    setEmail("");
    localStorage.setItem("user", response.email);
    window.location.href = "/tickets";
  };

  const handleUserInput = (e) => {
    setUser(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login">
        <div className="input-group flex-nowrap my-1 auto-width">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="addon-wrapping"
            value={user}
            onChange={handleUserInput}
          />
        </div>
        <div className="input-group flex-nowrap my-1 auto-width">
          <span className="input-group-text" id="addon-wrapping">
            @
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
            value={email}
            onChange={handleEmailInput}
          />
        </div>
        <button
          onClick={onSubmit}
          type="submit"
          className="btn btn-primary my-1 auto-width"
        >
          Login
        </button>
        <p>
          Don't have an account <Link to="/signup">SignUp</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
