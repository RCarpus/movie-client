import React from 'react';
import Axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

export default class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true
    };
  }

  // Load in movies from my database after rendering MainView
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* These following methods let me affect the state of this parent element from interactions within the Child component */
  /* Functions are passed as an attribute into the child component */

  // Passed to MovieCard
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // Passed to LoginView
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    Axios.get('https://rcarpus-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //assign result to state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Passed to RegistrationView
  onRegister(registered, user) {
    this.setState({
      registered,
      user
    });
  }

  // Passed to LogoutButton
  // LOOK FOR A WAY TO REFACTOR THIS
  logoutUser(uselessParam) {
    this.setState({
      user: false,
      selectedMovie: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // This needs a param here even if I don't use it or else setState doesn't work
  // LOOK FOR A WAY TO REFACTOR THIS
  toRegistrationView(asdf) {
    this.setState({
      registered: false
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // RegistrationView if user is not registered
    if (!registered) return <RegistrationView onRegister={(registered, username) => this.onRegister(registered, username)} />;

    // LoginVIew if user is registered, but not logged in
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toRegistrationView={asdf => this.toRegistrationView(asdf)} />;

    // Empty Mainview if there are no movies (or movies are still loading)
    if (movies.length === 0) return <div className="main-view"></div>;

    // If we get here then user is registered and logged in
    // Render list of MovieCard comps if no movie is selected
    // Go to MovieView if a movie is selected
    return (
      <div className="main-view">
        <Row>
          <Col>
            <LogoutButton logoutUser={user => { this.logoutUser(user); }}/>
          </Col>
        </Row>
        {selectedMovie
          ?
          // <Row className="justify-content-md-center">
          <Row>
            <Col>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          </Row>
          : (
            <div>
              <Row className="justify-content-md-center">
                <Col md={4}>
                  <h1 className="display-2">Movies</h1>
                </Col>
              </Row>

              <Row className="justify-content-md-center">
                {movies.map(movie => (
                  <Col md={3}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                  </Col>
                ))}
              </Row>
            </div>
          )
        }
      </div>);
  }
}
