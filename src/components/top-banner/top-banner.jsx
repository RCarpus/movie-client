import React from 'react'
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import { setUserData } from '../../actions/actions';

import './top-banner.scss';
import { LogoutButton } from '../logout-button/logout-button';


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
          <img src="../../img/logo.png" />
        </div>
        <div>
          <p id="title">MyFlix</p>
        </div>
        {userData.Username && <LogoutButton logoutUser={logoutUser} />}

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
