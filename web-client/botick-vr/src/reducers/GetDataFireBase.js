const defaultState = {
    seats: [],
    counter: 0,
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case 'SAVE_SEATS_FIRE':
    // console.log('ini reducers firebase', action.payload.userFire.slice(1, action.payload.userFire.length));
    return {
        ...state,
        seats: action.payload.userFire.slice(1, action.payload.userFire.length)
    }
    default:
    return state
  }
}
