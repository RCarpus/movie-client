import React from 'react';
import Axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// #0
import { setMovies, setUserData, setIsRegistered } from '../../actions/actions';


import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { LoginView } from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';

// removed export default
class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      selectedMovie: null,
      userData: null,
    };
  }

  // Load in movies and user data from my database after rendering MainView
  // this triggers before actually logging in,
  // so an additional GET is made after logging in
  componentDidMount() {
    if ( !this.props.userData.Username ) {
      let user = localStorage.getItem('user');
      let token = localStorage.getItem('token');
      this.getUserData(token, user);
    }
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
      //this.getUserData(accessToken, localStorage.getItem('user'));
    }
    console.log("main view mounted");
    console.log(this.state);
    console.log(this.props);
  }

  // Passed to LoginView
  onLoggedIn(authData) {
    // this.setState({
    //   user: authData.user.Username,
    //   userData: authData.user
    // });
    this.props.setUserData(authData.user);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username); // may not need this at the end
    this.getMovies(authData.token);
  }

  getMovies(token) {
    Axios.get('https://rcarpus-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        /* #4 */
        this.props.setMovies(response.data);
        // this.setState({
        //   movies: response.data
        // });
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
        // this.setState({
        //   userData: response.data
        // });
        this.props.setUserData(response.data);
        console.log(`This is the data we found:
          ${Object.keys(response.data)}`);
        // console.log(`The current state is:`);
        // console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Passed to LogoutButton
  // LOOK FOR A WAY TO REFACTOR THIS
  logoutUser(uselessParam) {
    // this.setState({
    //   user: false,
    //   selectedMovie: null
    // });
    this.props.setUserData({}); //set user data to an empty object 
    localStorage.clear();
    window.location.href = '/';
  }

  // This needs a param here even if I don't use it or else setState doesn't work
  // LOOK FOR A WAY TO REFACTOR THIS
  toRegistrationView(asdf) {
    // this.setState({
    //   registered: false
    // });
    this.props.setIsRegistered(false);
  }

  receiveUpdatedUserDataFromMovieView(userData) {
    // this.setState({
    //   userData
    // });
    this.props.setUserData(userData); //this should be redundant when I am done
  }

  render() {
    let { movies, userData, isRegistered } = this.props; // #5
    console.log(movies);
    console.log(userData);

    // RegistrationView if user is not registered
    if (!isRegistered) return <RegistrationView />;

    // LoginVIew if user is registered, but not logged in
    if (!userData.Username) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toRegistrationView={asdf => this.toRegistrationView(asdf)} />;

    // Empty Mainview if there are no movies (or movies are still loading)
    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <Router>
        {/* If We get here then we are logged in and movies have loaded. */}
        {/* LogoutButton hangs out at the top of each logged in screen */}
        <Row>
          <Col>
            <LogoutButton logoutUser={user => { this.logoutUser(user); }} />
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
                onBackClick={() => history.back()}
                // userData={this.state.userData} 
                sendUpdatedUserDataToMainView={userData => { this.receiveUpdatedUserDataFromMovieView(userData) }}/>
            </Col>
          }} />

          {/* This route is linked to from MovieCard */}
          <Route path="/directors/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.back()}
                movies={movies} />
            </Col>
          }
          } />

          {/* This route is linked to from MovieCard */}
          <Route path="/genres/:name" render={({ match }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.back()}
                movies={movies} />
            </Col>
          }
          } />

          {/* This route is linked to from main movie list page, 
              MovieView, DirectorView, and GenreView */}
          <Route exact path="/profile" render={() => {
            return <ProfileView movies={movies} //userData={this.state.userData}
                  sendUpdatedUserDataToMainView={userData => { this.receiveUpdatedUserDataFromMovieView(userData) }}/>
          }} />

        </Row>
      </Router>
    );
  }
}

// #7
let mapStateToProps = state => {
  return { movies: state.movies, userData: state.userData, isRegistered: state.isRegistered }
}

// #8 
export default connect(mapStateToProps, { setMovies, setUserData, setIsRegistered } )(MainView);