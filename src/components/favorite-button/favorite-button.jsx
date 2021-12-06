import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

import './favorite-button.scss';

export class FavoriteButton extends React.Component {

  render() {
    const { isFavorite } = this.props;
    return (
      isFavorite?
        <Button id="favorite-button" onClick={this.props.removeFromFavorites} >&#9733;</Button>
        : <Button id="favorite-button" onClick={this.props.addToFavorites} >&#9734;</Button>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
FavoriteButton.propTypes = {
  isFavorite: PropTypes.string.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired
};