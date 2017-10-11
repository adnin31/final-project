const defaultState = {
  movielist: [],
  movieShowTime: ''
}

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case 'GET_MOVIE_ALL':
      return {
        ...state,
        movielist: actions.payload.movielist
      }
    case 'GET_MOVIE_SHOWTIME':
      return {
        ...state,
        movieShowTime: actions.payload.movieShowTime
      }
    default:
      return state
  }
}
