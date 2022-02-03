export enum UserDataActions {
   START_FETCH_USER_DATA = 'START_FETCH_USER_DATA',
   SUCCESS_FETCH_USER_DATA = 'SUCCESS_FETCH_USER_DATA',
   ERROR_FETCH_USER_DATA = 'ERROR_FETCH_USER_DATA',
}

interface ResponseDataInterface {
   username: string | null
   avatar: string | null
   created_post: number | null
}

interface ResponseErrorDataInterface {
   error: string
}

interface StartFetchUserData {
   type: UserDataActions.START_FETCH_USER_DATA
}

interface SuccessFetchUserData {
   type: UserDataActions.SUCCESS_FETCH_USER_DATA,
   payload: ResponseDataInterface
}

interface ErrorFetchUserData {
   type: UserDataActions.ERROR_FETCH_USER_DATA,
   payload: ResponseErrorDataInterface
}

export type UserDataAction = StartFetchUserData | SuccessFetchUserData | ErrorFetchUserData
