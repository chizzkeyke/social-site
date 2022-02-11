import { Dispatch } from 'redux'
import { AuthActions } from '../types/redux/auth/authActionsType'
import { startAuthUser, successAuthUser, errorAuthUser } from '../redux/auth/actions/actionsCreator'
import axios from 'axios'

interface ResponseData {
   message: string
   token: string
}

export const registerUser = (
   username: string,
   email: string,
   password: string,
   confirmPassword: string
) => async (dispatch: Dispatch<AuthActions>) => {
   try {
      dispatch(startAuthUser())
      const res: ResponseData = await axios.post('http://localhost:8000/api/register', {
         username,
         email,
         password,
         confirmPassword
      })
      dispatch(successAuthUser(res.token))
      localStorage.setItem('token', res.token)
   } catch (e) {
      dispatch(errorAuthUser(e as string))
   }
}

interface ResponseLoginDataInterface {
   data: ResponseData
}

export const loginUser = (
   email: string,
   password: string
) => async (dispatch: Dispatch<AuthActions>) => {
   try {
      dispatch(startAuthUser())
      const res: ResponseLoginDataInterface = await axios.post('http://localhost:8000/api/login', {
         email,
         password
      })
      dispatch(successAuthUser(res.data.token))
      localStorage.setItem('token', res.data.token)
   } catch (e) {
      dispatch(errorAuthUser(e as string))
   }
}