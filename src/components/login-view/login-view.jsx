import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send auth request to server
    props.onLoggedIn(username);
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    // LOOK FOR A WAY TO REFACTOR THIS SO THAT I DO NOT NEED THIS USELESS PARAMETER
    props.toRegistrationView('');
  }

  return (
    <div className="login-view">
      <h2>Login to myFlix</h2>

      <form className="login-form">

        <div className="login-form__line">
          <label className="login-form__line__label">
            Username:
          </label >
            <input class="login-form__line__input-field" type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>

        <div className="login-form__line">
          <label className="login-form__line__label">
            Password:
          </label>
          <input class="login-form__line__input-field" type="text" value={password} onChange={e => setPassword(e.target.value)} />        
        </div>

        <button class="login-form__login-button" type="submit" onClick={handleSubmit}>Log in</button>
      
      </form>

      <div>
        <span>Don't have an account? </span>
        <button type="submit" onClick={handleClickRegister}>Register</button>
      </div>
    </div>
  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegistrationView: PropTypes.func.isRequired
};