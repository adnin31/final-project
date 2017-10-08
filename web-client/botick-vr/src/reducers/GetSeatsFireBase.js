const defaultState = {
    seats: []
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case 'SAVE_SEATS_FIRE':
    console.log('ini reducers seats', action.payload.userFire);
    return {
        ...state,
        seats: action.payload.userFire
    }
    default:
    return state
  }
}
