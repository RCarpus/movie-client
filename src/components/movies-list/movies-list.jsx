import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter/visibility-filter';
import { MovieCard } from '../movie-card/movie-card';
import ToggleSortButton from '../toggle-sort-button/toggle-sort-button';

import './movies-list.scss';

const mapStateToProps = state => {
  const { movies, visibilityFilter, sortBy } = state;
  return { movies, visibilityFilter, sortBy };
};

function MoviesList(props) {
  const { movies, visibilityFilter, sortBy } = props;

  let filteredMovies = movies;

  // Filter movies based on the string in the visibility filter input
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  // sort movies alphabetically either ascending or descending
  if ( sortBy === "ASC") filteredMovies.sort((m1, m2) => m1.Title > m2.Title ? 1 : -1);
  else filteredMovies.sort((m1, m2) => m1.Title < m2.Title ? 1 : -1);

  if (!movies) return <div className="main-view" />;

  return <>
      <Col xs={10}  md={6} >
        <VisibilityFilterInput className="filter-line-item" visibilityFilter={visibilityFilter} />
      </Col>
      <Col xs={2} md={6}>
        <ToggleSortButton  className="filter-line-item" />
      </Col>
    {filteredMovies.map(m => (
      <Col md={6} lg={4} xl={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  // all from store
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
  ).isRequired,
  visibilityFilter: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired
}