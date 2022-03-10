import React from 'react'
import { useDispatch } from 'react-redux'
import { getUsersThunk } from '../DAL/fetchUsers'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { nanoid } from 'nanoid'
import { Button } from 'antd'
import { HighlightOutlined } from '@ant-design/icons'
import { chatsActionsThunk} from '../DAL/fetchChats'

export const ListUsers: React.FC = (): JSX.Element => {
   const dispatch = useDispatch()
   const {users} = useTypedSelector(state => state.user)
   const username = useTypedSelector(state => state.user.username)

   React.useEffect(() => {
      dispatch(getUsersThunk())
   }, [])

   const startChat = (author: string | null, partner: string) => {
      dispatch(chatsActionsThunk('POST', {author, partner}))
   }

   return (
      <ul className={'profile_list_users'}>
         {users?.map(user => (
            <li
               key={nanoid()}
               className={'list_users_item'}
            >
               {user.username}
               <Button
                  type={'primary'}
                  icon={<HighlightOutlined/>}
                  onClick={() => startChat(username, user.username)}
               >
                  Start Chat
               </Button>
            </li>
         ))}
      </ul>
   )
}