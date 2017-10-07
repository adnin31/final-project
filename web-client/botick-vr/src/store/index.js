import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducers from '../reducers'

const middleware = applyMiddleware(thunk)
const store = createStore(rootReducers, middleware)

export default store
