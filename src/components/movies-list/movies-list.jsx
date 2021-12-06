import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter/visibility-filter';
import { MovieCard } from '../movie-card/movie-card';
import ToggleSortButton from '../toggle-sort-button/toggle-sort-button';

const mapStateToProps = state => {
  const { visibilityFilter, sortBy } = state;
  return { visibilityFilter, sortBy };
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
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    <Col>
      <ToggleSortButton />
    </Col>
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
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