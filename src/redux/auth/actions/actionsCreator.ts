import { AuthActions, AuthUserActions } from '../../../types/redux/auth/authActionsType'

export const startAuthUser = (): AuthActions => {
   return {
      type: AuthUserActions.START_AUTH
   }
}

export const successAuthUser = (token: string): AuthActions => {
   return {
      type: AuthUserActions.SUCCESS_AUTH,
      payload: token
   }
}

export const errorAuthUser = (error: string | string[]): AuthActions => {
   return {
      type: AuthUserActions.ERROR_AUTH,
      payload: error
   }
}