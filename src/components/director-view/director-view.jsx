import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from "react-router-dom";

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick, movies } = this.props;
    // moviesByDirector is limited to 3 movies by .slice(0,3)
    let moviesByDirector = movies.filter(m => m.Director.Name === director.Name).slice(0, 3);
    return (
      <div className='director-view'>

        <Row className="director-view__title-line">
          <Col sm={12} md={6}>
            <Button id="back-button" onClick={() => { onBackClick(null); }}>&lt;</Button>
            <span className="director-view__title">{director.Name}</span>
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

        <div className='director-view__info'>
          <p className="director-view__info__description-label">Description</p>
          <span className="director-view__info__description">{director.Bio}</span>
          <p className="director-view__info__movie-list-label">Some movies from this director</p>

          <Row>
            {moviesByDirector.map(m => (
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

// prop-types
// Give informational warnings in browser if data does not match required shape
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired
  })
};