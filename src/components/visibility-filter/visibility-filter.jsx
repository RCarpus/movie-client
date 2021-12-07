import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';
import './visibility-filter.scss';

function VisibilityFilterInput(props) {
  return <Form.Control
      className = 'visibility-filter-input' 
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder='filter by title'
    />;
}

export default connect( null, { setFilter } )(VisibilityFilterInput);

VisibilityFilterInput.propTypes = {
  visibilityFilter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}