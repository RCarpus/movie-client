import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    super();
    this.state = {
      username: props.user,
      movies: props.movies
    };
  }

  //load user data AND get a list of favorite movies
  getUser(token, username) {
    Axios.get(`https://rcarpus-movie-api.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          favoriteMovies: response.data.FavoriteMovies
        }, () => {
          // callback determines the favorite movies after loading user data
          // and updates state again
          this.findFavorites(this.state.movies, this.state.favoriteMovies);
          this.setState({
            favoriteMovieList: this.findFavorites(this.state.movies, this.state.favoriteMovies)
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //This gets the user info before mounting the component
  componentWillMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken, this.state.username);
    }

  }

  // helper function for findFavorites()
  isFavorite(movie, favoriteMovieIds) {
    console.log(movie);
    return (favoriteMovieIds.indexOf(movie._id) > -1) ? true : false;
  }

  // takes in a list of movie objects and a list of ids
  // returns a list of movies matching the ids
  findFavorites(movies, favoriteMovieIds) {
    let favorites = [];
    for (let i = 0; i < movies.length; i++) {
      if (favoriteMovieIds.indexOf(movies[i]._id) > -1) {
        favorites.push(movies[i]);
      }
    }
    return favorites;
  }

  removeFromFavorites(movie_id) {
    console.log(`deleting: ${movie_id} for user: ${this.state.username}`);
    Axios.delete(`https://rcarpus-movie-api.herokuapp.com/users/${this.state.username}/movies/${movie_id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      this.setState({
        favoriteMovies: response.data.FavoriteMovies
      }, () => {
          // callback determines the favorite movies after loading user data
          // and updates state again
        this.findFavorites(this.state.movies, this.state.favoriteMovies);
        this.setState({
          favoriteMovieList: this.findFavorites(this.state.movies, this.state.favoriteMovies)
        });
      });
      console.log(`We deleted a movie`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
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
            <Form className="update-info-form">

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>
                      Username
                    </Form.Label>
                  </Col>
                  <Col>
                    <Form.Control />
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
                    <Form.Control />
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
                    <Form.Control />
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
                    <Form.Control />
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Col>
                  <Button className="btn btn-secondary btn-sm" variant="primary" type="submit" >Update</Button>
                </Col>
              </Row>

            </Form>
          </Col>
          <Col>
            <Button className="btn btn-secondary btn-sm" variant="danger" type="submit" >Unregister</Button>
          </Col>

        </Row>

        <p>My Favorite movies</p>
        <Row>
          {this.state.favoriteMovieList && this.state.favoriteMovieList.map(m => (
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