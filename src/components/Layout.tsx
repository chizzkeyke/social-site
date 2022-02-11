import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { Sider } from './Sider'
import { SiderPropsLinksInterface } from '../types/components/Sider'
import { HeaderLayout } from './HeaderLayout'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const LayoutComponent = () => {
   const {Content} = Layout
   const [isOpen, setIsOpen] = React.useState<boolean>(false)
   const {auth} = useTypedSelector(state => state.auth)


   const links: SiderPropsLinksInterface[] = !auth
      ? [
         {path: '/', namePath: 'Home'},
         {path: '/login', namePath: 'Login'},
         {path: '/register', namePath: 'Register'},
      ]
      : [
         {path: '/', namePath: 'Home'},
         {path: '/new-post', namePath: 'CreateNewPost'},
         {path: '/update-post', namePath: 'UpdatePost'},
         {path: '/posts', namePath: 'Posts'}
      ]

   const openSider = () => {
      setIsOpen(!isOpen)
   }

   return (
      <Layout className={'layout_app'}>
         <Layout className={'container'}>
            <HeaderLayout open={openSider}/>
            <Layout className={'content'}>
               <Sider isOpen={isOpen} links={links}/>
               <Content className={'content_active'}>
                  <Outlet/>
               </Content>
            </Layout>
         </Layout>
      </Layout>
   )
}