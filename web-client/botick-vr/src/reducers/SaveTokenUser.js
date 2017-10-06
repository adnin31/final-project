const defaultState = {
    token: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_USER_TOKEN':
    return {
        ...state,
        token: action.payload.token
    }
    default:
    return state
  }
}
