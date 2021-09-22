import React, { useState } from "react";
import { register } from "../userAuth.js";

export default function UserRegister({ setAppBarTitle, ...props }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [registerResultMessage, setRegisterResultMessage] = useState("");
  const [registered, setRegistered] = useState(false);

  setAppBarTitle('Registration');
  
  function handleLoginChange(event) {
    setLogin(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    register(login, password)
      .then(json => {
        setRegisterResultMessage("User registered successfuly!");
        setRegistered(true);
      })
      .catch(error => {
        setRegisterResultMessage("User register error: " + error.message);
        setRegistered(false);
      });
  }

  return (
    <div>
      <div>
        <h3>UserRegister</h3>
      </div>
      <form onSubmit={handleSubmit}>
        {!registered && (
          <div>
            <label>Login:</label>
            <input value={login} onChange={handleLoginChange} />
            <label>Password:</label>
            <input value={password} onChange={handlePasswordChange} />
            <input type="submit" value="Sign up" />
          </div>
        )}

        {registerResultMessage &&
          <div>{registerResultMessage}</div>
        }
      </form>
    </div>
  );
}
