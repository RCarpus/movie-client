import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

import { setSortBy } from '../../actions/actions';

function ToggleSortButton(props) {
  const { sortBy, setSortBy } = props;

  const toggleSort = () => {
    switch (sortBy) {
      case 'DESC':
        setSortBy('ASC');
        console.log('changed from desc to asc');
        break;
      case 'ASC':
        setSortBy('DESC');
        console.log('changed from asc to desc');
        break;
      default:
        return;
    }
  }
  return <Button onClick={toggleSort}>Sort</Button>;
}

const mapStateToProps = state => {
  return { sortBy: state.sortBy };
};

export default connect( mapStateToProps, { setSortBy } )(ToggleSortButton);

ToggleSortButton.propTypes = {
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired
}