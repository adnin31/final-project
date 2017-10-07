import { combineReducers } from 'redux'

import movieReducer from './GetDataMovie'
import studioReducer from './GetDataStudio'

export default combineReducers({
  movie: movieReducer,
  studio: studioReducer
})
