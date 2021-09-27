import { combineReducers } from 'redux';   //import d'une biblio qui combine tous les reducers
import userReducer from './user.reducer'

export default combineReducers({
    userReducer,
})