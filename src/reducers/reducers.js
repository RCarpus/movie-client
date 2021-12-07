import { combineReducers } from 'redux';

import { 
        SET_FILTER, 
        SET_SORT_BY,
        SET_MOVIES, 
        SET_USER_DATA, 
        SET_IS_REGISTERED
      } from '../actions/actions';

// A reducer just takes a state and an action, and returns a new state
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// Using string rather than a bool to allow for possibility of additional filters
function sortBy(state = 'ASC', action) {
  switch (action.type) {
    case SET_SORT_BY:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userData(state = {}, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return action.value;
    default:
      return state;
  }
}

function isRegistered(state = true, action) {
  switch (action.type) {
    case SET_IS_REGISTERED:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  sortBy,
  movies,
  userData,
  isRegistered
});

/* This code does the same thing as the shorthand above */
// function moviesApp(state = {}, action) {
//   return {
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
//   }
// }

export default moviesApp;