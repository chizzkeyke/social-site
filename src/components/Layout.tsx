import React from 'react'
import { Outlet, Link } from 'react-router-dom'


import { Layout, Button } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

const {Header, Sider, Content} = Layout

export const LayoutComponent = () => {
   const [activeSideBar, setActiveSideBar] = React.useState<boolean>(false)

   const toggleSidebar = () => {
      setActiveSideBar(!activeSideBar)
   }

   return (
      <Layout className={'layout_app'}>
         <Layout className={'container'}>
            <Header className={'header'}>
               <div className={'logo_header'}>
                  <Button
                     type="primary"
                     icon={<UnorderedListOutlined/>}
                     size={'large'}
                     className={'btn_header'}
                     onClick={toggleSidebar}
                  />
               </div>
               <div className={'header_content'}>
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

               </div>
            </Header>
            <Layout className={'content'}>
               {activeSideBar ? <Sider className={'sider'}>Sider</Sider> : null}
               <Content className={'content_active'}>
                  <Outlet/>
               </Content>
            </Layout>
         </Layout>
      </Layout>
   )
}