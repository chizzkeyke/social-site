enum UserDataActions {
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

type UserDataAction = StartFetchUserData | SuccessFetchUserData | ErrorFetchUserData

interface UserStateReducer {
   username: string | null
   avatar: string | null
   created_post: number | null
   loading: boolean
}

const initialState: UserStateReducer = {
   username: null,
   avatar: null,
   created_post: null,
   loading: false
}

export const userReducer = (state = initialState, action: UserDataAction) => {
   switch (action.type) {
      case UserDataActions.START_FETCH_USER_DATA: {
         return {
            ...state,
            loading: true
         }
      }
      case UserDataActions.SUCCESS_FETCH_USER_DATA: {
         const {username, avatar, created_post} = action.payload

         return {
            username,
            avatar,
            created_post,
            loading: false
         }
      }
   }
}