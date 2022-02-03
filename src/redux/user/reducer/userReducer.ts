import { UserStateReducer } from '../../../types/redux/user/userReducerType'
import { UserDataAction, UserDataActions } from '../../../types/redux/user/userActionType'

const initialStateUserReducer: UserStateReducer = {
   username: null,
   avatar: null,
   created_post: null,
   loading: false,
   error: null
}

export const userReducer = (state = initialStateUserReducer, action: UserDataAction) => {
   switch (action.type) {
      case UserDataActions.START_FETCH_USER_DATA: {
         return {
            ...state,
            loading: true
         }
      }
      case UserDataActions.SUCCESS_FETCH_USER_DATA: {
         const {username, avatar, created_post} = action.payload
         return {
            ...state,
            username,
            avatar,
            created_post,
            loading: false
         }
      }
      case UserDataActions.ERROR_FETCH_USER_DATA: {
         const {error} = action.payload
         return {
            ...state,
            error,
            loading: false
         }
      }
      default: {
         return state
      }
   }
}