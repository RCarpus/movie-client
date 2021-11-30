import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';


export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;
    console.log(genre);
    return (
      <Row className='genre-view'>
        <Col lg={8}>
        <div className="genre-view__title-line">
            <Button id="back-button" onClick={() => { onBackClick(null); }}>&lt;</Button>
            <span className="genre-view__title">{genre.Name}</span>
        </div>


          <div className='genre-info'>
            <div className="genre-view__line">
              <span className="genre-view__line__label">Description: </span>
              <span className="genre-view__line__value">{genre.Description}</span>
            </div>

          </div>

        </Col>

      </Row>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
GenreView.propTypes = {

};