import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
// import combineReducers from './reducers'

import promiseMiddleware from './middleware/promiseMiddleware'

import counter from './counter/index'
import userInfo from './userInfo/index'

const reducers = combineReducers({
    counter,
    userInfo
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware, promiseMiddleware))

export default store

