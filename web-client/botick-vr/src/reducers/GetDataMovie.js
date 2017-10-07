const defaultState = {
  movielist: []
}

export default (state = defaultState, actions) => {
  switch (actions.type) {
    case 'GET_MOVIE_ALL':
    console.log('ini di reducer get movie',actions.payload.movielist)
      return {
        ...state,
        movielist: actions.payload.movielist
      }
    default:
      return state
  }
}
