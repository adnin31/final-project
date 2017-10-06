import { combineReducers } from 'redux'

import movieReducer from './GetDataMovie'
import theaterReducer from './GetDataTheater'

export default combineReducers({
  movie: movieReducer,
  theater: theaterReducer
})
