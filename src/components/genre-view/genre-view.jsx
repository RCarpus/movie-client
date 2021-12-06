import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import './genre-view.scss';

class GenreView extends React.Component {

  render() {
    const { genre, onBackClick, movies } = this.props;
    // moviesFromGenre is limited to 3 items
    let moviesFromGenre = movies.filter(m => m.Genre.Name === genre.Name).slice(0, 3);
    return (
      <div className='genre-view'>

        <Row className="genre-view__title-line">
          <Col sm={12} md={6}>
            <Button id="back-button" onClick={() => { onBackClick(null); }}>&lt;</Button>
            <span className="genre-view__title">{genre.Name}</span>
          </Col>
          <Col>
            <Link to={'/'}>
              <Button className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">All movies</Button>
            </Link>
            <Link to={'/profile'}>
              <Button className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">Profile</Button>
            </Link>
          </Col>
        </Row>

        <div className='genre-view__info'>
          <p className="genre-view__info__description-label">Description</p>
          <span className="genre-view__info__description">{genre.Description}</span>
          <p className="genre-view__info__movie-list-label">Some movies that belong to this genre</p>

          <Row>
            {moviesFromGenre.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>

        </div>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    // comes from MainView
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired,
  // Comes from store
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
  ).isRequired
};

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, null )(GenreView);