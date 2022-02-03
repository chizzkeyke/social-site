import { combineReducers } from 'redux'

import { authReducer } from './auth/reducer/authReducer'
import { userReducer } from './user/reducer/userReducer'
import { postReducer } from './posts/reducer/postReducer'

export const rootReducer = combineReducers({
   auth: authReducer,
   post: postReducer,
   user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>