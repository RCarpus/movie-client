import React from 'react';
import Axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { LogoutButton } from '../logout-button/logout-button';

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
    Axios.get('https://rcarpus-movie-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
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
  onLoggedIn(user) {
    this.setState({
      user
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
        {selectedMovie
          ? (<div>
              <LogoutButton logoutUser={uselessParam => this.logoutUser(uselessParam)} />
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </div>)
          : (<div>
              <LogoutButton logoutUser={uselessParam => this.logoutUser(uselessParam)} />
              <h1>Movies</h1>
              {movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
            </div>)
        }
      </div>  
    );
  }
}
