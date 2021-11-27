import React from 'react';
import PropTypes from 'prop-types';

import './logout-button.scss';

export function LogoutButton(props) {

  const handleLogout = (e) => {
    e.preventDefault();
    props.logoutUser('useless param');
  }

  return (
    <button className="logout-button" type="submit" onClick={handleLogout}>Logout</button>
  );
}