import React from 'react'
import { NavLink } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { SiderPropsLinksInterface, SiderPropsInterface } from '../types/components/Sider'

export const Sider = ({isOpen, links, isClose}: SiderPropsInterface) => {
   return (
      <ul className={isOpen ? 'sider open' : 'sider'}>
         {links?.map((el: SiderPropsLinksInterface) => (
            <li key={nanoid()} className={'sider_nav_links'}>
               <NavLink
                  to={el.path}
                  key={nanoid()}
                  style={{color: '#ccc'}}
                  onClick={isClose}
               >
                  {el.namePath}
               </NavLink>
            </li>
         ))}
      </ul>
   )
}