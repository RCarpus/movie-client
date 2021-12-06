import React from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';

import { setUserData } from '../../actions/actions';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super();
    this.form = React.createRef();
    this.updateUserData = this.updateUserData.bind(this);
    this.unregister = this.unregister.bind(this);
  }

  updateUserData() {
    if ( this.form.current.reportValidity() ) {
      let Username = this.form.current[0].value;
      let Password = this.form.current[1].value;
      let Email = this.form.current[2].value;
      let Birthday = this.form.current[3].value;
      let updatedData = {};
      if ( Username.length > 0 ) updatedData.Username = Username;
      if ( Password.length > 0 ) updatedData.Password = Password;
      if ( Email.length > 0 ) updatedData.Email = Email;
      if ( Birthday.length > 0 ) updatedData.Birthday = Birthday;
      console.log(updatedData);
      
      // Axios PUT
      let authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      Axios.put(`https://rcarpus-movie-api.herokuapp.com/users/${localStorage.getItem('user')}`, updatedData, authHeader)
        .then(response => {
          window.alert('successfully updated user data');
          this.props.setUserData(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    }
    else {
      console.log('invalid form');
    }
  }

  removeFromFavorites(movie_id) {
    console.log(`deleting: ${movie_id} for user: ${this.props.userData.Username}`);
    Axios.delete(`https://rcarpus-movie-api.herokuapp.com/users/${this.props.userData.Username}/movies/${movie_id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      this.props.setUserData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  unregister() {
    console.log('unregistering');
    let reallyUnregister = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
    console.log(reallyUnregister);
    if (reallyUnregister) {
      Axios.delete(`https://rcarpus-movie-api.herokuapp.com/users/${this.props.userData.Username}`, {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(response => {
        localStorage.clear();
        this.props.setUserData({});
        window.location.href = '/';
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render() {
    const { movies, userData } = this.props;
    const favoriteMovies = userData.FavoriteMovies.map((movieID) => movies.find((movie) => movie._id === movieID));

    return (
      <div className="profile-view">
        <Row>
          <Col sm={12} md={7}>
            <h2>Profile</h2>
          </Col>
          <Col md={5}>
            <Link to={'/'}>
              <Button className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">All movies</Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form className="update-info-form" ref={this.form} onSubmit={e => e.preventDefault()}>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>
                      Username
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.props.userData.Username}
                                  pattern="^[a-zA-Z0-9]{5,}$"/>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>
                      Password
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={'new password'}/>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>
                      E-mail
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.props.userData.Email}
                                  pattern=".*@.*\..*"/>
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>
                      Date of birth
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.props.userData.Birthday ? this.props.userData.Birthday.slice(0,10) : 'yyyy-mm-dd'}
                                  pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}$"/>
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Col>
                  <Button className="btn btn-secondary btn-sm" variant="primary" type="submit" onClick={this.updateUserData} >Update</Button>
                </Col>
              </Row>

            </Form>
          </Col>
          <Col>
            <Button className="btn btn-secondary btn-sm" variant="danger" type="submit" onClick={this.unregister}>Unregister</Button>
          </Col>

        </Row>

        <p>My Favorite movies</p>
        <Row>
          { favoriteMovies.map(m => (
              <Col md={3} key={m._id}>
                <Row>
                  <MovieCard movie={m} />
                </Row>
                <Row>
                  <Button onClick={() => this.removeFromFavorites(m._id)}>remove favorite</Button>
                </Row>
              </Col>
          ))}
        </Row>

      </div>
    )
  }
}


let mapStateToProps = state => {
  return { userData: state.userData, movies: state.movies }
}

export default connect(mapStateToProps, { setUserData } )(ProfileView);