import counter from './counter/index'
import userInfo from './userInfo/index'

export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action),
        userInfo: userInfo(state.userInfo, action)
    }
}
