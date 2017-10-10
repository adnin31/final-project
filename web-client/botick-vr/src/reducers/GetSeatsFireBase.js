const defaultState = {
    seats: []
}

export default (state = defaultState, action) => {

  switch (action.type) {
    case 'SAVE_SEATS_FIRE':
    return {
        ...state,
        seats: action.payload.userFire
    }
    default:
    return state
  }
}
