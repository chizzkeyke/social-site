import {Dispatch} from 'redux'
import {UserDataAction} from '../types/redux/user/userActionType'
import axios from 'axios'
import {startFetchDataUser, getUsers, errorFetchDataUser} from '../redux/user/action/actionCreator'

export const getUsersThunk = () => async (dispatch: Dispatch<UserDataAction>) => {
   const token = localStorage.getItem('token')
   try {
      dispatch(startFetchDataUser())
      const response = await axios({
         method: 'GET',
         url: 'http://localhost:8000/api/users',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      dispatch(getUsers(response.data.data))
   } catch (e) {
      dispatch(errorFetchDataUser(e))
   }
}