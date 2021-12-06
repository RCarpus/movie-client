import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";

import './movie-card.scss';

let imgPath = '../img/';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src={imgPath + movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title> 
          <Card.Text className="text-truncate">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
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
};