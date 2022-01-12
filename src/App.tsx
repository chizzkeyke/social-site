import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Auth } from './pages/Auth'
import { Posts } from './pages/Posts'
import { Home } from './pages/Home'
import { LayoutComponent } from './components/Layout'

export const App: React.FC = (): JSX.Element => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path={'/'} element={<LayoutComponent />}>
               <Route path={'/'} element={<Home/>}/>
               <Route path={'/register'} element={<Auth/>}/>
               <Route path={'/login'} element={<Auth/>}/>
               <Route path={'/posts'} element={<Posts/>}/>
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

