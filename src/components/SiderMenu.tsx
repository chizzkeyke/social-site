import React from 'react'
import { nanoid } from 'nanoid'

type linksType = string[]

const SiderMenu = (links: linksType) => {
   return (
      <ul>
         {links.map(element => (
            <>
               <ul id={nanoid()}>{element}</ul>
               <hr/>
            </>
         ))}
      </ul>
   )
}

export default SiderMenu