import React from 'react'; 
import axios from 'axios';

import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

export class LoginView extends React.Component {

  constructor(props) {
    super();
    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onLoggedIn = props.onLoggedIn;
    this.toRegistrationView = props.toRegistrationView;
  }

  handleSubmit() {
    if (this.form.current.reportValidity()) {
      let loginCredentials = {
        Username: this.form.current[0].value,
        Password: this.form.current[1].value
      };
      axios.post('https://rcarpus-movie-api.herokuapp.com/login', loginCredentials)
        .then(response => {
          const data = response.data;
          this.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
          window.alert('invalid username or password');
        });
    }
  };

  render() {
    return (
      <div className="login-view">
        <Row>
          <Col>
            <h2 className="display-4">Login to MyFlix</h2>
          </Col>
        </Row>

        <Form className="login-form" ref={this.form} onSubmit={e => e.preventDefault()}>
          <Form.Group controlId="formUsername">
            <Row className="login-view__line">
              <Col sm={0} md={3}></Col>
              <Col sm={12} md={2}>
                <Form.Label>Username:</Form.Label>
              </Col>
              <Col sm={12} md={4}>
                <Form.Control required/>
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
                <Form.Control type="password" required />
              </Col>
            </Row>
          </Form.Group>

          <Row className="login-view__line">
            <Col md={8}></Col>
            <Col >
              <Button variant="primary" type="submit" onClick={this.handleSubmit}>
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
            <Button variant="secondary" onClick={this.props.toRegistrationView}>Register</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegistrationView: PropTypes.func.isRequired
};