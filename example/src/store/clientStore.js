import {createStore, combineReducers} from 'redux'
import clientReducer from './clientReducer'
const appReducer=combineReducers({
    clientReducer:clientReducer,
})
export default createStore(appReducer)