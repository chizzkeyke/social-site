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
   payload: string
}

interface InterfaceAuthActionError {
   type: AuthUserActions.ERROR_AUTH
   payload: string | string[] | unknown
}

export type AuthActions = InterfaceAuthActionStart | InterfaceAuthActionSuccess | InterfaceAuthActionError