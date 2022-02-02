import { AuthStateInterface } from '../../../types/redux/auth/authReducerType'
import authActionInterface from '../../../types/redux/auth/authActionsType'
import { AuthUserActions } from '../../../types/redux/auth/authActionsType'

const token = localStorage.getItem('token')
const initialStateAuthReducer: AuthStateInterface = token ? {
   auth: true,
   loading: false,
   error: null,
   token
} : {
   auth: false,
   loading: false,
   error: null,
   token: null
}

export const authReducer = (state = initialStateAuthReducer, action: authActionInterface) => {
   switch (action.type) {
      case AuthUserActions.START_AUTH: {
         return {
            ...state,
            loading: true
         }
      }

      case AuthUserActions.SUCCESS_AUTH: {
         return {
            ...state,
            auth: true,
            loading: false,
            token: action.payload
         }
      }

      case AuthUserActions.ERROR_AUTH: {
         return {
            ...state,
            loading: false,
            error: action.payload
         }
      }

      default: {
         return state
      }
   }
}