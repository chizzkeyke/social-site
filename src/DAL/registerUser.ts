import { Dispatch } from 'redux'
import { AuthActions } from '../types/redux/auth/authActionsType'
import { startAuthUser, successAuthUser, errorAuthUser } from '../redux/auth/actions/actionsCreator'
import axios, {AxiosResponse} from 'axios'

interface ResponseData {
   message: string
   token: string
}

export const registerUser = (
   username: string,
   email: string,
   password: string,
   confirmPassword: string) => async (dispatch: Dispatch<AuthActions>) => {
      dispatch(startAuthUser())
      return axios.post('http://localhost:8000/api/register', {
         username,
         email,
         password,
         confirmPassword
      })
         .then((res: AxiosResponse<ResponseData>) => {
            dispatch(successAuthUser(res.data.token))
            localStorage.setItem('token', res.data.token)
         })
         .catch((err) => {
            console.log(err)
         })
}

export const loginUser = (
   email: string,
   password: string
) => (dispatch: Dispatch<AuthActions>) => {
   dispatch(startAuthUser())
   return axios.post('http://localhost:8000/api/login', {
      email,
      password
   })
      .then((res: AxiosResponse<ResponseData>) => {
         dispatch(successAuthUser(res.data.token))
         localStorage.setItem('token', res.data.token)
      })
      .catch((err) => {
         dispatch(errorAuthUser(err))
      })
}