import React from 'react'
import { NavLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import {SiderPropsLinksInterface, SiderPropsInterface} from '../types/components/Sider'


export const Sider = ({isOpen, links}: SiderPropsInterface) => {
   return (
         <ul className={isOpen ? 'sider open' : 'sider'}>
            {links?.map((el: SiderPropsLinksInterface) => (
               <NavLink to={el.path} key={nanoid()}><li  className={'sider_nav_links'}>{el.namePath}</li></NavLink>
            ))}
         </ul>
   )
}