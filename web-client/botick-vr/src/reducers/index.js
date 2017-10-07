import { combineReducers } from 'redux'

import movieReducer from './GetDataMovie'
import saveTokenUSer from './SaveTokenUser'
import studioReducer from './GetDataStudio'

export default combineReducers({
  movie: movieReducer,
  token: saveTokenUSer,
  studio: studioReducer
})
