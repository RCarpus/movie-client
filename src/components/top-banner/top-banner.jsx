import React from 'react'
import Row from 'react-bootstrap/Row';

import './top-banner.scss';

export function TopBanner() {

  return(
    <Row className="banner">
      <div className="gridbox">
        <div id="logo">
          <img src="../../img/logo.png"/>
        </div>
        <div>
          <p id="title">MyFlix</p>
        </div>
      </div>
    </Row>
  );
}