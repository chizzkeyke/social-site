import React from 'react'
import { Button, Input } from 'antd'
import { useLocation, Navigate } from 'react-router-dom'
import { registerUser, loginUser } from '../DAL/authUser'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Loader } from '../components/Loader'

export const Auth: React.FC = (): JSX.Element => {
   const [userName, setUsername] = React.useState<string>('')
   const [email, setEmail] = React.useState<string>('')
   const [password, setPassword] = React.useState<string>('')
   const [confirmPassword, setConfirmPassword] = React.useState<string>('')

   const {auth, loading} = useTypedSelector(state => state.auth)
   const {username} = useTypedSelector(state => state.user)
   const dispatch = useDispatch()
   const {pathname} = useLocation()
   const path: boolean = pathname === '/register'
   const title = path ? 'Register' : 'Login'

   const disableButtonOnRegister = (): boolean => {
      return userName === '' || email === '' || password === '' || confirmPassword === ''
   }

   const disableButtonOnLogin = (): boolean => {
      return email === '' || password === ''
   }

   const sendResponse = (): void => {
      if (path) {
         dispatch(registerUser(userName, email, password, confirmPassword))
      } else {
         dispatch(loginUser(email, password))
      }
   }

   if (auth) {
      return <Navigate to={'/load-user-data'} />
   }

   if (auth && username) {
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
