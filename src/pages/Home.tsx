import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const Home: React.FC = () => {
   const isAuth = useTypedSelector(state => state.auth.auth)

   return (
      <div>
         {
            isAuth
               ? (
                  <div>
                     Welcome
                  </div>
               )
               : (
                  <div>
                     You are not auth
                  </div>
               )
         }
      </div>
   )
}

