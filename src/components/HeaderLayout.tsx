import React from 'react'
import { Button, Layout, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface HeaderLayoutPropsInterface {
   open: () => void
}

export const HeaderLayout = ({open}: HeaderLayoutPropsInterface) => {
   const {Header} = Layout
   const {auth} = useTypedSelector(state => state.auth)
   const {username} = useTypedSelector(state => state.user)

   return (
      <Header className={'header'}>
         <div className={'logo_header'}>
            <Button
               type="primary"
               icon={<UnorderedListOutlined/>}
               size={'large'}
               className={'btn_header'}
               onClick={open}
            />
         </div>
         <div className={'header_content'}>
            {
               auth
                  ? (
                        <div className={'header_avatar'}>
                           <div>Welcome {username}</div>
                           <Link to={'/my-profile'} className={'profile_avatar'}><Avatar src="https://joeschmoe.io/api/v1/2" icon={<UserOutlined/>}/></Link>
                        </div>
                  )
                  : (
                     <>
                        <Link to={'/login'}>
                           <Button type={'primary'} shape={'round'} size={'large'} className={'btn_header'}>
                              Sign In
                           </Button>
                        </Link>
                        <Link to={'/register'}>
                           <Button type={'primary'} shape={'round'} size={'large'} className={'btn_header'}>
                              Sign up
                           </Button>
                        </Link>
                     </>
                  )
            }
         </div>
      </Header>
   )
}