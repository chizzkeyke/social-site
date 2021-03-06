import {UserInterface} from './userReducerType'

export enum UserDataActions {
   START_FETCH_USER_DATA = 'START_FETCH_USER_DATA',
   SUCCESS_FETCH_USER_DATA = 'SUCCESS_FETCH_USER_DATA',
   ERROR_FETCH_USER_DATA = 'ERROR_FETCH_USER_DATA',
   CLEAR_DATA_USER = 'clear data user',
   GET_USERS = 'get users'
}

export interface ResponseDataInterface {
   username: string | null
   avatar: string | null
   created_post: number | null
}

interface ResponseErrorDataInterface {
   error: string
}

interface StartFetchUserDataAction {
   type: UserDataActions.START_FETCH_USER_DATA
}

interface SuccessFetchUserDataAction {
   type: UserDataActions.SUCCESS_FETCH_USER_DATA,
   payload: ResponseDataInterface
}

interface ErrorFetchUserDataAction {
   type: UserDataActions.ERROR_FETCH_USER_DATA,
   payload: ResponseErrorDataInterface
}

interface ClearDataUserAction {
   type: UserDataActions.CLEAR_DATA_USER
}

interface GetUsersAction {
   type: UserDataActions.GET_USERS,
   payload: UserInterface[]
}

export type UserDataAction =
   StartFetchUserDataAction |
   SuccessFetchUserDataAction |
   ErrorFetchUserDataAction |
   ClearDataUserAction |
   GetUsersAction
