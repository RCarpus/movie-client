import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './registration-view.scss';
import { render } from 'react-dom';

export class RegistrationView extends React.Component {
  constructor(props) {
    super();
    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // Send auth request to server
    let newUserInfo = {};
    if (this.form.current.reportValidity() 
        && this.form.current[1].value !== this.form.current[2].value) {
          window.alert('passwords must match');
        }
    if (this.form.current.reportValidity() 
        && this.form.current[1].value === this.form.current[2].value) {
      console.log('adding a new user');
      newUserInfo.Username = this.form.current[0].value;
      newUserInfo.Password = this.form.current[1].value;
      newUserInfo.Email = this.form.current[3].value;
      if (this.form.current[4].value !== '') {
        newUserInfo.Birthday = this.form.current[4].value;
      }
      axios.post('https://rcarpus-movie-api.herokuapp.com/users/register', newUserInfo)
        .then(response => {
          const data = response.data;
          console.log('registered successfully');
          console.log(data);
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('something went wrong. Maybe some info was missing.')
        });
    }
    else {
      console.log('failed to fill the form properly');
    }

  };

  render() {

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

        <Form className="registration-form" ref={this.form} onSubmit={e => e.preventDefault()}>

          <Form.Group className="registration-form__line">
            <Row>
              <Col md={emptySize}></Col>
              <Col md={labelSize}>
                <Form.Label className="registration-form__line-label">
                  Username <span className="registration-form__label-tips">(5+ characters, no spaces)</span>
                </Form.Label>
              </Col>
              <Col md={fieldSize}>
                <Form.Control className="registration-form__line__input-field" pattern="^[a-zA-Z0-9]{5,}$" required />
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
                <Form.Control className="registration-form__line__input-field" type="password" pattern=".+" required />
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
                <Form.Control className="registration-form__line__input-field" type="password" pattern=".+" required />
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
                <Form.Control className="registration-form__line__input-field" pattern=".*@.*\..*" required />
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
                <Form.Control className="registration-form__line__input-field" pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}$" />
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col md={labelSize + fieldSize + emptySize - 2}></Col>
            <Col md={1}>
              <Button className="register-button" variant="primary" type="submit" onClick={this.handleSubmit}>Register</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
RegistrationView.propTypes = {
};