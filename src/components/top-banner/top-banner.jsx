import React from 'react'
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";


import { setUserData } from '../../actions/actions';

import './top-banner.scss';
import { LogoutButton } from '../logout-button/logout-button';
import Button from 'react-bootstrap/Button';


function TopBanner(props) {
  const { userData, setUserData } = props;

  // Passed to LogoutButton
  const logoutUser = () => {
    setUserData({});
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <Row className="banner">
      <div className="gridbox">
        <div id="logo">
          <img id="logo__img" src="../../img/logo.png" />
        </div>
        <div>
          <p id="title">MyFlix</p>
        </div>
        <div>
          {userData.Username &&
            <Link to={'/profile'}>
              <Button id="banner__profile-button" className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">Profile</Button>
            </Link>}
        </div>
        <div>
          {userData.Username && <LogoutButton logoutUser={logoutUser} />}
        </div>
      </div>
    </Row>
  );
}

let mapStateToProps = state => {
  return {
    userData: state.userData,
  }
}

export default connect(mapStateToProps, { setUserData })(TopBanner);
