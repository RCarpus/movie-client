import React from 'react';
import PropTypes from 'prop-types';

import './logout-button.scss';

export function LogoutButton(props) {

  const handleLogout = (e) => {
    e.preventDefault();
    props.logoutUser('useless param');
  }

  return (
    <button className="btn btn-link float-sm-right" type="button" onClick={handleLogout}>Logout</button>
  );
}

// prop-types
// Give informational warnings in browser if data does not match required shape
LogoutButton.propTypes = {
  logoutUser: PropTypes.func.isRequired
};