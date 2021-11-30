import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './director-view.scss';


export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;
    console.log(director);
    return (
      <Row className='Director-view'>
        <Col lg={8}>
        <div className="Director-view__title-line">
            <Button id="back-button" onClick={() => { onBackClick(null); }}>&lt;</Button>
            <span className="Director-view__title">{director.Name}</span>
        </div>


          <div className='Director-info'>
            <div className="Director-view__line">
              <span className="Director-view__line__label">Bio: </span>
              <span className="Director-view__line__value">{director.Bio}</span>
            </div>

          </div>

        </Col>

      </Row>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
DirectorView.propTypes = {

};