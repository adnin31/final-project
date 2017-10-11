const defaultState = {
    token: '',
    username: '',
    email: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SAVE_USER_TOKEN':
    return {
        ...state,
        token: action.payload.dataUser.token,
        email: action.payload.dataUser.email,
        username: action.payload.dataUser.username
    }
    default:
    return state
  }
}
