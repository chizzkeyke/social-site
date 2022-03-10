import { combineReducers } from 'redux'

import { authReducer } from './auth/reducer/authReducer'
import { userReducer } from './user/reducer/userReducer'
import { postReducer } from './posts/reducer/postReducer'
import { commentsReducer } from './comments/reducer/commentReducer'
import { chatReducer } from './chat/reducer/chatReducer'

export const rootReducer = combineReducers({
   auth: authReducer,
   post: postReducer,
   user: userReducer,
   comments: commentsReducer,
   chat: chatReducer
})

export type RootState = ReturnType<typeof rootReducer>

