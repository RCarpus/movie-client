import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
  // Shorthands used with { useState } Reat Hook 
  // https://reactjs.org/docs/hooks-state.html
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Modify state of MainView to be registered and logged in with new user
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onRegister(true, username);
  };

  return (
    <div className="registration-view">
      <h2>Sign up for a free MyFlix account:</h2>

      <form className="registration-form">

        <div className="registration-form__line">
          <label className="registration-form__line-label">
            Username: 
          </label>
            <input className="registration-form__line__input-field" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <span className="registration-form__label-tips">5+ characters, no spaces</span>
        </div>
        
        <div class="registration-form__line">
          <label className="registration-form__line-label">
            Enter desired password: 
          </label>
            <input className="registration-form__line__input-field" type="text" value={password1} onChange={e => setPassword1(e.target.value)} />
            <span className="registration-form__label-tips">must not be blank</span>
        </div>
        
        <div className="registration-form__line">
          <label className="registration-form__line-label">
            Re-enter password:
          </label>
            <input className="registration-form__line__input-field" type="text" value={password2} onChange={e => setPassword2(e.target.value)} />
            <span className="registration-form__label-tips">passwords must match</span>
        </div>
        
        <div className="registration-form__line">
          <label className="registration-form__line-label">
            Email: 
          </label>
            <input className="registration-form__line__input-field" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <span className="registration-form__label-tips">required</span>
        </div>
        
        <div className="registration-form__line">
          <label class="registration-form__line-label" className="registration-form__line">
            Birthday: 
          </label>
            <input className="registration-form__line__input-field" type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
            <span className="registration-form__label-tips">optional</span>
        </div>
        

        <button type="submit" onClick={handleSubmit}>Register</button>
      </form>
    </div>
  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};