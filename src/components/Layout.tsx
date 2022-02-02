import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import 'antd/dist/antd.css'
import { Sider } from './Sider'
import { SiderPropsLinksInterface } from '../types/components/Sider'
import { HeaderLayout } from './HeaderLayout'

export const LayoutComponent = () => {
   const {Content} = Layout
   const [isOpen, setIsOpen] = React.useState<boolean>(false)

   const links: SiderPropsLinksInterface[] = [
      {path: '/', namePath: 'Home'},
      {path: '/post', namePath: 'News'},
      {path: '/register', namePath: 'Register'}
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