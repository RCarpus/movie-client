import React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FavoriteButton } from '../favorite-button/favorite-button';


import './movie-view.scss';

let imgPath = '.././img/';

export class MovieView extends React.Component {

  constructor(props) {
    super();
    this.state = {
      movie: props.movie,
      userData: props.userData,
      isFavorite: false //will be updated in componentWillMount()
    }
  }

  // Determine if this movie is a favorite movie before mounting
  // so that the correct value is sent to favorite button
  /* BUG: main-view does not know when value has been changed, so
      until main view does a new GET this value will be wrong if you swap between movies */
  // componentWillMount() {
  //   console.log(`A movie view for ${this.state.movie.Title} will be rendered.`);
  //   this.setState({
  //     isFavorite: this.isFavoriteMovie()
  //   }, () => console.log(this.state));
  // }

  // // used by componentWillMount()
  // isFavoriteMovie() {
  //   if (this.state.userData.FavoriteMovies) {
  //     return (this.state.userData.FavoriteMovies.indexOf(this.state.movie._id) > -1);
  //   }
  // }

  // Removes movie from user's favorites list
  // sent as prop to FavoriteButton
  removeFromFavorites() {
    Axios.delete(`https://rcarpus-movie-api.herokuapp.com/users/${localStorage.getItem('user')}/movies/${this.state.movie._id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      this.setState({
        userData: response.data
      });
      console.log(`We deleted a movie`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /* does not work for an unknown reason */
  // Should add a movie to the user's favorites list
  // sent as prop to FavoriteButton
  addToFavorites() {
    Axios.post(`https://rcarpus-movie-api.herokuapp.com/users/${localStorage.getItem('user')}/movies/${this.state.movie._id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(response => {
      this.setState({
        userData: response.data
      });
      console.log(`We added a movie`);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className='movie-view'>
        <Row>
          <Col sm={12} md={9}>
            <div className="movie-view__title-line">
                <Button id="back-button" onClick={() => { onBackClick(null); }}>&lt;</Button>
                <span className="movie-view__title">{movie.Title}</span>
                <FavoriteButton isFavorite={this.state.isFavorite}
                                removeFromFavorites={() => { this.removeFromFavorites(); }}
                                addToFavorites={() => { this.addToFavorites(); }}/>
            </div>
          </Col>

          <Col>
            <Link to={'/profile'}>
                <Button className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">Profile</Button>
            </Link>
          </Col>
        </Row>

        <Row>
        
          <Col lg={8}>

            <div className='movie-info'>
              <div className="movie-view__line">
                <span className="movie-view__line__label">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <span className="movie-view__line__value">{movie.Genre.Name}</span>
                </Link>
              </div>

              <div className="movie-view__line">
                <span className="movie-view__line__label">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span className="movie-view__line__value">{movie.Director.Name}</span>
                </Link>
              </div>

              <div className="movie-view__line description">
                <span className="movie-view__line__label">Description: </span>
                <span className="movie-view__line__value">{movie.Description}</span>
              </div>
            </div>

          </Col>
          <Col lg={4}>
            <div className="movie-poster">
              <img src={imgPath + movie.ImagePath}  />
            </div>
          </Col>

        </Row>
      </div>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
MovieView.propTypes = {
  movie: PropTypes.shape({
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    Birthday: PropTypes.string,
    Email: PropTypes.string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    Password: PropTypes.string,
    Username: PropTypes.string,
    _id: PropTypes.string
  })
};