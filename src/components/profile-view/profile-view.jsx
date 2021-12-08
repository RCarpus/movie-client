import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { setUserData } from '../../actions/actions';
import PropTypes from 'prop-types';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.form = React.createRef();
    this.updateUserData = this.updateUserData.bind(this);
    this.unregister = this.unregister.bind(this);
  }

  updateUserData() {
    if (this.form.current.reportValidity()) {
      let Username = this.form.current[0].value;
      let Password = this.form.current[1].value;
      let Email = this.form.current[2].value;
      let Birthday = this.form.current[3].value;
      let updatedData = {};
      if (Username.length > 0) updatedData.Username = Username;
      if (Password.length > 0) updatedData.Password = Password;
      if (Email.length > 0) updatedData.Email = Email;
      if (Birthday.length > 0) updatedData.Birthday = Birthday;

      let authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      Axios.put(`https://rcarpus-movie-api.herokuapp.com/users/${localStorage.getItem('user')}`, updatedData, authHeader)
        .then(response => {
          window.alert('successfully updated user data');
          localStorage.setItem('user', response.data.Username);
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
    let reallyUnregister = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
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
        <div className="user-info">
          <Row>
            <Col sm={12} md={9}>
              <h2>Profile</h2>
            </Col>
            <Col md={3}>
              <Link to={'/'}>
                <Button className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">All movies</Button>
              </Link>
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={8} lg={6} xl={5}>
              <Form className="update-info-form" ref={this.form} onSubmit={e => e.preventDefault()}>

                <Form.Group>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label className="user-info__form-label">
                        Username
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control className="user-info__form-input" placeholder={this.props.userData.Username}
                        pattern="^[a-zA-Z0-9]{5,}$" />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label className="user-info__form-label">
                        Password
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control className="user-info__form-input" placeholder={'new password'} />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label className="user-info__form-label">
                        E-mail
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control className="user-info__form-input" placeholder={this.props.userData.Email}
                        pattern=".*@.*\..*" />
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group>
                  <Row>
                    <Col xs={12} md={4}>
                      <Form.Label className="user-info__form-label">
                        Date of birth
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control className="user-info__form-input" placeholder={this.props.userData.Birthday ? this.props.userData.Birthday.slice(0, 10) : 'yyyy-mm-dd'}
                        pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}$" />
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
              <Button id="unregister-button" className="btn btn-secondary btn-sm" variant="danger" type="submit" onClick={this.unregister}>Unregister</Button>
            </Col>

          </Row>
        </div>
        <div className="favorite-movies">
          <h3>My Favorite movies</h3>
          {userData.FavoriteMovies.length === 0 && <p id="no-favorites-message">You don't have any favorites yet. Go add some movies!</p>}
          <Row className="favorite-movies__cards">
            {favoriteMovies.map(m => (
              <Col md={4} key={m._id}>
                <Row>
                  <MovieCard movie={m} />
                </Row>
                <Row>
                  <Button type="button" className="btn btn-sm btn-warning" onClick={() => this.removeFromFavorites(m._id)}>remove favorite</Button>
                </Row>
              </Col>
            ))}
          </Row>
        </div>

      </div>
    )
  }
}

let mapStateToProps = state => {
  return { userData: state.userData, movies: state.movies }
}

export default connect(mapStateToProps, { setUserData })(ProfileView);

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Featured: PropTypes.bool.isRequired,
      ImagePath: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        BirthYear: PropTypes.number.isRequired,
        DeathYear: PropTypes.number
      })
    })
  ).isRequired,
  userData: PropTypes.shape({
    Birthday: PropTypes.string,
    Email: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    Username: PropTypes.string,
  }).isRequired,
  setUserData: PropTypes.func.isRequired
}