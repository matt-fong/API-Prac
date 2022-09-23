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
        <div className="createSpotError">
          {(errors).map((error, i) => (
            <div className="errorMessageContainer" key={i}>
              <i class="fa-solid fa-exclamation exclamation-point"></i>
              <div className="errorMessage">{error}</div>
            </div>
          ))}
        </div>
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
        <div className='orWrapper'>
          <div className='line'></div>
          <div className='or'>or</div>
          <div className='line'></div>
        </div>
        <button
          className="loginSubmitDemo"
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
