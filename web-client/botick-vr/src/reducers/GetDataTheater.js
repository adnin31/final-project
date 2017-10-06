const defaultState = {
    theaterlist: []
}
  
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_THEATER_ALL':
    return {
        ...state,
        theaterlist: action.payload
    }
    default:
    return state
  }
}
  