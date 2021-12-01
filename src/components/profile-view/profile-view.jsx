import React from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { LogoutButton } from '../logout-button/logout-button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor(props) {
    // let username = props.user;
    super();
    this.state = {
      userData: null,
      username: props.user
      // email: user.Email,
      // birthday: user.Birthday,
      // favoriteMovies: user.FavoriteMovies
    };
  }

  getUser(token, username) {
    Axios.get(`https://rcarpus-movie-api.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //assign result to state
        this.setState({
          userData: response.data
        });
        console.log(`This is the data we found:
          ${Object.keys(response.data)}`);
        console.log(`The current state is:`);
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    console.log(`UserProfile has mounted. Now fetching user data from endpoint ${this.state.username}`);
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken, this.state.username);
    }
    
  }

  render() {
    // const { Username, Email, Birthday, FavoriteMovies } = this.state.userData;
    let userData = this.state.userData;

    return(
      userData?
      <div>
        <p>This should be a profile view.</p>
        <p>{this.state.userData.Username}</p>
        <p>{this.state.userData.Email}</p>
        <p>{this.state.userData.Birthday}</p>
        <p>{this.state.userData.FavoriteMovies}</p>
      </div>
      :
      <p>loading</p>
    )
  }
}