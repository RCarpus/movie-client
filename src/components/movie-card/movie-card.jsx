import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

let imgPath = './img/';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    // return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    return (
      <Card>
        <Card.Img variant="top" src={imgPath + movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title> 
          <Card.Text className="text-truncate">{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
        </Card.Body>
      </Card>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};