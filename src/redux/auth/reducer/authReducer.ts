import authReducerInterface from '../../../types/redux/auth/authReducerType'
import authActionInterface from '../../../types/redux/auth/authActionsType'
import { START_AUTH, SUCCESS_AUTH, ERROR_AUTH } from '../actions/constantsAuth'

const initialStateAuthReducer: authReducerInterface = {
   auth: false,
   loading: false,
   errors: null
}

export const authReducer = (state = initialStateAuthReducer, action: authActionInterface) => {
   switch (action.type) {
      case START_AUTH: {
         return {
            ...state,
            loading: true
         }
      }

      case SUCCESS_AUTH: {
         return {
            ...state,
            auth: true,
            loading: false
         }
      }

      case ERROR_AUTH: {
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