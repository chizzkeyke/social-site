import React from 'react'
import { Avatar } from 'antd'
import { ListPosts } from '../components/ListMyPosts'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchPostsAuthUserThunk } from '../DAL/fetchPost'
import { ListUsers } from '../components/ListUsers'

export const MyProfile: React.FC = () => {
   const {username} = useTypedSelector(state => state.user)
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(fetchPostsAuthUserThunk(username))
   }, [])

   return (
      <div className={'profile_layout_content'}>
         <div className={'profile_user_data'}>
            <h2>{username}</h2>
            <Avatar/>
            <ListUsers/>
         </div>
         <ListPosts/>
      </div>
   )
}

