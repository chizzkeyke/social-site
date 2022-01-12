import { combineReducers } from 'redux'
import { authReducer } from './auth/reducer/authReducer'

export const rootReducer = combineReducers({
   auth: authReducer,
})