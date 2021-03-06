import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setIsRegistered } from '../../actions/actions';


import './registration-view.scss';

export class RegistrationView extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    let newUserInfo = {};

    // This only warns the user that the passwords don't match if the form is otherwise valid
    if (this.form.current.reportValidity()
      && this.form.current[1].value !== this.form.current[2].value) {
      window.alert('passwords must match');
    }
    if (this.form.current.reportValidity()
      && this.form.current[1].value === this.form.current[2].value) {
      newUserInfo.Username = this.form.current[0].value;
      newUserInfo.Password = this.form.current[1].value;
      newUserInfo.Email = this.form.current[3].value;
      if (this.form.current[4].value !== '') {
        newUserInfo.Birthday = this.form.current[4].value;
      }
      axios.post('https://rcarpus-movie-api.herokuapp.com/users/register', newUserInfo)
        .then(response => {
          const data = response.data;
          window.open('/', '_self');
        })
        .catch(e => {
          console.log('something went wrong. Maybe some info was missing.')
        });
    }
  };

  render() {

    let labelSize = 4;
    let fieldSize = 5;
    let emptySize = 1;
    const { setIsRegistered } = this.props;

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
                  Birthday <span className="registration-form__label-tips">(optional, yyyy-mm-dd)</span>
                </Form.Label>
              </Col>
              <Col md={fieldSize}>
                <Form.Control className="registration-form__line__input-field" pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}$" />
              </Col>
            </Row>
          </Form.Group>

          <Row>
            <Col md={labelSize + fieldSize + emptySize - 2}>
            </Col>
            <Col md={1}>
              <Button className="register-button" variant="primary" type="submit" onClick={this.handleSubmit}>Register</Button>
            </Col>
          </Row>
          <Row>
            <Col >
              <Button id="already-registered-button" onClick={() => setIsRegistered(true)} className="btn btn-secondary">I already have an account</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

RegistrationView.propTypes = {
  setIsRegistered: PropTypes.func.isRequired
}

export default connect(null, { setIsRegistered })(RegistrationView);
