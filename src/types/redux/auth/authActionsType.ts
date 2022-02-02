export default interface AuthActionsInterface {
   type: string
   payload?: string[]
}

export enum AuthUserActions {
   START_AUTH = 'start auth',
   SUCCESS_AUTH = 'success auth',
   ERROR_AUTH = 'errors auth'
}

interface InterfaceAuthActionStart {
   type: AuthUserActions.START_AUTH
}

interface InterfaceAuthActionSuccess {
   type: AuthUserActions.SUCCESS_AUTH,
   payload: string | unknown
}

interface InterfaceAuthActionError {
   type: AuthUserActions.ERROR_AUTH
   payload: string | unknown
}

export type AuthActions = InterfaceAuthActionStart | InterfaceAuthActionSuccess | InterfaceAuthActionError