import React from 'react';
import Axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';

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

  //This method lets me affect the state of this parent element from the Movie Card Child element
  //when passed as an attribute into the MovieCard
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  onRegister(registered, user) {
    this.setState({
      registered,
      user
    });
  }

  // This needs a param here even if I don't use it or else setState doesn't work
  toRegistrationView(asdf) {
    this.setState({
      registered: false
    });
    console.log("got here");
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered) return <RegistrationView onRegister={(registered, username) => this.onRegister(registered, username)} />;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toRegistrationView={asdf => this.toRegistrationView(asdf)} />;


    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)
        }
      </div>
    );
  }
}
