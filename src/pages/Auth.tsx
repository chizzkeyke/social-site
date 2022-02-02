import React from 'react'
import { Button, Input } from 'antd'
import { useLocation, Navigate } from 'react-router-dom'
import { registerUser, loginUser } from '../DAL/registerUser'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../components/Loader'

export const Auth: React.FC = (): JSX.Element => {
   const [userName, setUsername] = React.useState<string>('')
   const [email, setEmail] = React.useState<string>('')
   const [password, setPassword] = React.useState<string>('')
   const [confirmPassword, setConfirmPassword] = React.useState<string>('')

   const loading = useTypedSelector(state => state.auth.loading)
   const isAuth = useTypedSelector(state => state.auth.auth)
   const dispatch = useDispatch()
   const {pathname} = useLocation()
   const path: boolean = pathname === '/register'
   const title = path ? 'Register' : 'Login'

   const disableButtonOnRegister = () => {
      if (userName === '' || email === '' || password === '' || confirmPassword === '') {
         return true
      }
   }

   const disableButtonOnLogin = () => {
      if (email === '' || password === '') {
         return true
      }
   }

   const sendResponse = (): void => {
      if (path) {
         dispatch(registerUser(userName, email, password, confirmPassword))
      } else {
         dispatch(loginUser(email, password))
      }
   }

   if (isAuth) {
      return <Navigate to={'/'} />
   }

   return (
      <div className={'auth_content'}>
         {
            loading
               ? <Loader/>
               : (
                  <>
                     <h2 className={'title_auth_page'}>{title}</h2>
                     <form className={'form_auth'}>
                        {path && (<Input
                           className={'input_auth_page'}
                           type={'text'}
                           placeholder={'Username'}
                           value={userName}
                           onChange={(e) => setUsername(e.target.value)}
                        />)}
                        <Input
                           className={'input_auth_page'}
                           type={'text'}
                           placeholder={'Email'}
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                           className={'input_auth_page'}
                           type={'password'}
                           placeholder={'Password'}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                        {path && (<Input
                           className={'input_auth_page'}
                           type={'password'}
                           placeholder={'Confirm Password'}
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                        />)}
                        <Button
                           className={'btn_auth_page'}
                           disabled={path ? disableButtonOnRegister() : disableButtonOnLogin()}
                           onClick={sendResponse}
                        >
                           Submit
                        </Button>
                     </form>
                  </>
               )
         }
      </div>
   )
}
