import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

let imgPath = './img/';

// This is temporary. Remove this as soon as you add an external style sheet.


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Row className='movie-view'>
        <Col lg={8}>
        {/* This is on top of grid */}
        <div className="movie-view__title-line">
          {/* <Col md={4}> */}
            <button className="movie-view-button" onClick={() => { onBackClick(null); }}>&lt;</button>
          {/* </Col> */}
          {/* <Col md={4}> */}
            <span className="movie-view__title">{movie.Title}</span>
          {/* </Col> */}
          {/* <Col md={4}> */}
            <button className="movie-view-button" >&#10032;</button>
          {/* </Col> */}
        </div>


          <div className='movie-info'>
            <div className="movie-view__line">
              <span className="movie-view__line__label">Genre: </span>
              <span className="movie-view__line__value">{movie.Genre.Name}</span>
            </div>

            <div className="movie-view__line">
              <span className="movie-view__line__label">Director: </span>
              <span className="movie-view__line__value">{movie.Director.Name}</span>
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
  onBackClick: PropTypes.func.isRequired
};