import React from 'react'
import { Loader } from '../components/Loader'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchDataAboutAuthUser } from '../DAL/fetchDataAboutAuthUser'
import { Navigate } from 'react-router-dom'

export const PageLoadUserData: React.FC = () => {
   const {auth} = useTypedSelector(state => state.auth)
   const {username, loading} = useTypedSelector(state => state.user)
   const dispatch = useDispatch()

   React.useEffect(() => {
      if (!auth) {
         return
      }
      dispatch(fetchDataAboutAuthUser())
   }, [])

   if (auth && username) {
      return <Navigate to={'/'} />
   }

   return (
      <div>
         {
            loading
               ? <Loader/>
               : null
         }
      </div>
   )
}