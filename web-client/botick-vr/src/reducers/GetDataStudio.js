const defaultState = {
    studiolist: []
}
  
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_STUDIO_ALL':
    return {
        ...state,
        studiolist: action.payload.studiolist
    }
    default:
    return state
  }
}
  