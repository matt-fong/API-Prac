import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpModal.css';

function SignUpForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");

  if (sessionUser) return <Redirect to="/" />;

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="signupForm" onSubmit={onSubmit}>
      <ul>
        {errors.map((error, i) => <li key={i}>{error}</li>)}
      </ul>
      <div className="signupInputContainer">
        <div className="signupInput">
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="signupInput">
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="signupInput">
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="signupInput">
          <input
            placeholder="Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="signupInput">
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
        </div>
        <div className="signupInput">
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="signupSubmit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignUpForm;
