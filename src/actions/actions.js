// action types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_GENRE = 'SET_GENRE';


// action creators    
export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserData(value) {
  return { type: SET_USER_DATA, value:
    {
      Username: value.Username,
      Email: value.Email,
      Birthday: value.Birthday,
      FavoriteMovies: value.FavoriteMovies
    }
  }
}

export function setGenre(value) {
  return { type: SET_GENRE, value:
    {
      Name: value.Name,
      Description: value.Description
    }
  }
}