import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send auth request to server
    axios.post('https://rcarpus-movie-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  const handleClickRegister = (e) => {
    e.preventDefault();
    // LOOK FOR A WAY TO REFACTOR THIS SO THAT I DO NOT NEED THIS USELESS PARAMETER
    props.toRegistrationView('');
  }

  return (
    <div className="login-view">
      <Row>
        <Col>
          <h2 className="display-4">Login to MyFlix</h2>
        </Col>
      </Row>

      <Form className="login-form">
        <Form.Group controlId="formUsername">
          <Row className="login-view__line">
            <Col sm={0} md={3}></Col>
            <Col sm={12} md={2}>
              <Form.Label>Username:</Form.Label>
            </Col>
            <Col sm={12} md={4}>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Row className="login-view__line">
            <Col sm={0} md={3}></Col>
            <Col sm={12} md={2}>
              <Form.Label>Password:</Form.Label>
            </Col>
            <Col sm={12} md={4}>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Col>
          </Row>
        </Form.Group>

        <Row className="login-view__line">
          <Col md={8}></Col>
          <Col >
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Log in
            </Button>
          </Col>
        </Row>

      </Form>

      <Row className="register-row">
        <Col md={3}>
          <p>Don't have an account? </p>
        </Col>
        <Col>
        <Button variant="secondary" type="submit" onClick={handleClickRegister}>Register</Button>
        </Col>
      </Row>
    </div>
  )
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegistrationView: PropTypes.func.isRequired
};