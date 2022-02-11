import { UserStateReducer } from '../../../types/redux/user/userReducerType'
import { UserDataAction, UserDataActions } from '../../../types/redux/user/userActionType'

const str: string | null = localStorage.getItem('userData')
let userData

if (str != null) {
   userData = JSON.parse(str)
}

const initialStateUserReducer: UserStateReducer = userData
   ? {
      username: userData.username,
      avatar: null,
      created_post: null,
      loading: false,
      error: null
   }
   : {
      username: null,
      avatar: null,
      created_post: null,
      loading: false,
      error: null
   }

export const userReducer = (state = initialStateUserReducer, action: UserDataAction): UserStateReducer => {
   switch (action.type) {
      case UserDataActions.START_FETCH_USER_DATA: {
         return {
            ...state,
            loading: true
         }
      }
      case UserDataActions.SUCCESS_FETCH_USER_DATA: {
         const {username} = action.payload
         return {
            ...state,
            username,
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

      case UserDataActions.CLEAR_DATA_USER: {
         return initialStateUserReducer
      }

      default: {
         return state
      }
   }
}