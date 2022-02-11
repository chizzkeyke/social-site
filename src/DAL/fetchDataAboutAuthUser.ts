import {Dispatch} from 'redux'
import {UserDataAction} from '../types/redux/user/userActionType'
import {startFetchDataUser, successFetchDataUser, errorFetchDataUser} from '../redux/user/action/actionCreator'
import axios from 'axios'
import { ResponseDataInterface } from '../types/redux/user/userActionType'

interface DataInterface {
   data: {
      data: ResponseDataInterface
   }
}

export const fetchDataAboutAuthUser = () => async (dispatch: Dispatch<UserDataAction>) => {
   const token = localStorage.getItem('token')
   try {
      dispatch(startFetchDataUser())
      const res: DataInterface = await axios({
         method: 'GET',
         url: 'http://localhost:8000/api/self',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      dispatch(successFetchDataUser(res.data.data))
      const parseUserData = JSON.stringify(res.data.data)
      localStorage.setItem('userData', parseUserData)
   } catch (e) {
      dispatch(errorFetchDataUser(e))
      console.warn('suck')
   }
}