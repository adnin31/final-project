import { combineReducers } from 'redux'

import movieReducer from './GetDataMovie'
import theaterReducer from './GetDataTheater'
import saveTokenUSer from './SaveTokenUser'

export default combineReducers({
  movie: movieReducer,
  theater: theaterReducer,
  token: saveTokenUSer
})
