import React from 'react';
import PropTypes from 'prop-types';

import './movie-view.scss';

let imgPath = './img/';

// This is temporary. Remove this as soon as you add an external style sheet.


export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className='movie-view'>
        
        {/* This is on top of grid */}
        <div className="movie-view__title-line">
          <button className="movie-view-button" onClick={() => { onBackClick(null); }}>&lt;</button>
          <span className="movie-view__title">{movie.Title}</span>
          <button className="movie-view-button" >&#10032;</button>
        </div>

        <div className='movie-view__grid'>

          {/* Grid column 1 */}
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

          {/* Grid column 2 */}
          <div className="movie-poster">
            <img src={imgPath + movie.ImagePath}  />
          </div>

        </div>
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
  onBackClick: PropTypes.func.isRequired
};