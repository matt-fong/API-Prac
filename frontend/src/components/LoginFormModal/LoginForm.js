import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginModal.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <form className="loginForm" onSubmit={handleSubmit}>
      <div className="loginErrorContainer">
        <ul>
          {errors.map((error, i) => (
            <li className="loginError" key={i}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="loginInputContainer">
        <div className="loginInput">
          <input className="loginInputText"
            placeholder="Username or Email"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="loginInput">
          <input className="loginInputText"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="loginSubmit">Log In</button>
        <button
          className="loginSubmit"
          type="submit"
          onClick={() => {
            setCredential("demouser");
            setPassword("password");
          }}
        >
          Demo User
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
