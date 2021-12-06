import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { 
        setMovies, 
        setUserData, 
        setIsRegistered
      } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

class MainView extends React.Component {

  // Load in movies and user data from my database after rendering MainView
  // this triggers before actually logging in,
  // so an additional GET is made after logging in
  componentDidMount() {
    if ( !this.props.userData.Username && localStorage.getItem('token') ) {
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      this.getUserData(token, user);
    }
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
    }
  }

  // Passed to LoginView
  onLoggedIn(authData) {
    this.props.setUserData(authData.user);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username); 
    this.getMovies(authData.token);
  }

  getMovies(token) {
    Axios.get('https://rcarpus-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
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
        this.props.setUserData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Passed to LogoutButton
  logoutUser() {
    this.props.setUserData({}); 
    localStorage.clear();
    window.location.href = '/';
  }

  toRegistrationView() {
    this.props.setIsRegistered(false);
  }

  render() {
    const { movies, userData, isRegistered } = this.props; // #5

    // RegistrationView if user is not registered
    if (!isRegistered) return <RegistrationView />;

    // LoginVIew if user is registered, but not logged in
    if (!localStorage.getItem('user')) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toRegistrationView={() => this.toRegistrationView()} />;

    // Empty Mainview if there are no movies (or movies are still loading)
    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <Router>
        {/* If We get here then we are logged in and movies have loaded. */}
        {/* LogoutButton hangs out at the top of each logged in screen */}
        <Row>
          <Col>
            <LogoutButton logoutUser={() => { this.logoutUser() }} />
          </Col>
        </Row>

        <Row className="main-view justify-content-md-center">


          {/* This is what renders by default after logging in */}
          <Route exact path="/" render={() => {
            // #6
            return <MoviesList movies={movies}/>
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                onBackClick={() => history.back()} />
            </Col>
          }} />

          {/* This route is linked to from MovieCard */}
          <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.back()} />
            </Col>
          }
          } />

          {/* This route is linked to from MovieCard */}
          <Route path="/genres/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.back()} />
            </Col>
          }
          } />

          {/* This route is linked to from main movie list page, 
              MovieView, DirectorView, and GenreView */}
          <Route exact path="/profile" render={() => {
            return <ProfileView />
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { 
          movies: state.movies, 
          userData: state.userData, 
          isRegistered: state.isRegistered 
        }
}

export default connect(mapStateToProps, { setMovies, setUserData, setIsRegistered } )(MainView);