import React from 'react';
import Axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import { ProfileView } from '../profile-view/profile-view';
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
      userData: null,
      registered: true
    };
  }

  // Load in movies and user data from my database after rendering MainView
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUserData(accessToken, localStorage.getItem('user'));
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
      headers: { Authorization: `Bearer ${token}` }
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

  getUserData(token, username) {
    Axios.get(`https://rcarpus-movie-api.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //assign result to state
        this.setState({
          userData: response.data
        });
        console.log(`This is the data we found:
          ${Object.keys(response.data)}`);
        console.log(`The current state is:`);
        console.log(this.state);
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

    return (
      <Router>
        <Row>
          <Col>
            <LogoutButton logoutUser={user => { this.logoutUser(user); }} />
          </Col>
        </Row>

        <Row className="main-view justify-content-md-center">

          <Route exact path="/profile" render={() => {
            return <ProfileView user={user} />
          }} />


          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.back()}
                        userData={this.state.userData} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} 
                onBackClick={() => history.back()} 
                movies={movies} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
                        onBackClick={() => history.back()} 
                        movies={movies} />
            </Col>
          }
          } />

        </Row>
      </Router>
    );
  }
}
