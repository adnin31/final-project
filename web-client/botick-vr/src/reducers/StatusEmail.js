const defaultState = {
    status: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_STATUS_EMAIL':
    return {
        ...state,
        status:  action.payload.status,
    }
    default:
    return state
  }
}
