import { START_AUTH, SUCCESS_AUTH, ERROR_AUTH } from './constantsAuth'
import authActionInterface from '../../../types/redux/auth/authActionsType'

export const startAuthUser = (): authActionInterface => {
   return {
      type: START_AUTH
   }
}

export const successAuthUser = (token: string): authActionInterface => {
   return {
      type: SUCCESS_AUTH,
      payload: [token]
   }
}

export const errorAuthUser = (error: string): authActionInterface => {
   return {
      type: ERROR_AUTH,
      payload: [error]
   }
}