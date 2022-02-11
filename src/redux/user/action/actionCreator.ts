import { UserDataAction, UserDataActions } from '../../../types/redux/user/userActionType'

import {ResponseDataInterface} from '../../../types/redux/user/userActionType'

export function startFetchDataUser(): UserDataAction {
   return {
      type: UserDataActions.START_FETCH_USER_DATA
   }
}

export function successFetchDataUser(userData: ResponseDataInterface): UserDataAction {
   return {
      type: UserDataActions.SUCCESS_FETCH_USER_DATA,
      payload: userData
   }
}

export function errorFetchDataUser(err: any) {
   return {
      type: UserDataActions.ERROR_FETCH_USER_DATA,
      payload: err
   }
}