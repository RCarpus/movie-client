import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';

export function RegistrationView(props) {
  // Shorthands used with { useState } React Hook 
  // https://reactjs.org/docs/hooks-state.html
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Modify state of MainView to be registered and logged in with new user
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password1, password2, email, birthday);
    // Send auth request to server
    axios.post('https://rcarpus-movie-api.herokuapp.com/users/register', {
      Username: username,
      Password: password1,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log('registered successfully');
      console.log(data);
      window.open('/', '_self');
    })
    .catch(e => {
      console.log('something went wrong. Maybe some info was missing.')
    });
  };

  let labelSize = 4;
  let fieldSize = 5;
  let emptySize = 1;

  return (
    <div className="registration-view">
      <Row>
        <Col>
          <h2 className="display-4">Sign up for a free MyFlix account</h2>
        </Col>
      </Row>

      <Form className="registration-form">

        <Form.Group className="registration-form__line">
          <Row>
            <Col md={emptySize}></Col>
            <Col md={labelSize}>
              <Form.Label className="registration-form__line-label">
                Username <span className="registration-form__label-tips">(5+ characters, no spaces)</span>
              </Form.Label>
            </Col>
            <Col md={fieldSize}>
              <Form.Control className="registration-form__line__input-field" type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
        
        <Form.Group className="registration-form__line">
          <Row>
            <Col md={emptySize}></Col>
            <Col md={labelSize}>
              <Form.Label className="registration-form__line-label">
                Enter desired password <span className="registration-form__label-tips">(must not be blank)</span>
              </Form.Label>
            </Col>
            <Col md={fieldSize}>
              <Form.Control className="registration-form__line__input-field" type="password" value={password1} onChange={e => setPassword1(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
        
        <Form.Group className="registration-form__line">
          <Row>
            <Col md={emptySize}></Col>
            <Col md={labelSize}>
              <Form.Label className="registration-form__line-label">
                Re-enter password <span className="registration-form__label-tips">(passwords must match)</span>
              </Form.Label>
            </Col>
            <Col md={fieldSize}>
              <Form.Control className="registration-form__line__input-field" type="password" value={password2} onChange={e => setPassword2(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
        
        <Form.Group className="registration-form__line">
          <Row>
            <Col md={emptySize}></Col>
            <Col md={labelSize}>
              <Form.Label className="registration-form__line-label">
                Email <span className="registration-form__label-tips">(required)</span>
              </Form.Label>
            </Col>
            <Col md={fieldSize}>
              <Form.Control className="registration-form__line__input-field" type="text" value={email} onChange={e => setEmail(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
        
        <Form.Group className="registration-form__line">
          <Row>
            <Col md={emptySize}></Col>
            <Col md={labelSize}>
              <Form.Label className="registration-form__line-label" className="registration-form__line">
                Birthday <span className="registration-form__label-tips">(optional)</span>
              </Form.Label>
            </Col>
            <Col md={fieldSize}>
              <Form.Control className="registration-form__line__input-field" type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>
        
        <Row>
          <Col md={labelSize + fieldSize + emptySize - 2}></Col>
          <Col md={1}>
            <Button className="register-button" variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};