import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { PostsPage } from './pages/PostPage'
import { Home } from './pages/Home'
import { LayoutComponent } from './components/Layout'
import { MyProfile } from './pages/MyProfile'
import { CreatePostPage } from './pages/NewPost'
import { PageLoadUserData } from './pages/PageLoadUserData'
import { SinglePostPage } from './pages/SinglePostPage'

export const App: React.FC = (): JSX.Element => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<LayoutComponent/>}>
               <Route path={'/'} element={<Home/>}/>
               <Route path={'/register'} element={<Auth/>}/>
               <Route path={'/login'} element={<Auth/>}/>
               <Route path={'/posts'} element={<PostsPage/>}/>
               <Route path={'/my-profile'} element={<MyProfile/>}/>
               <Route path={'/posts/:id'} element={<SinglePostPage/>}/>
               <Route path={'/new-post'} element={<CreatePostPage/>}/>
               <Route path={'/update-post'} element={<CreatePostPage/>}/>
               <Route path={'/load-user-data'} element={<PageLoadUserData/>}/>
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

