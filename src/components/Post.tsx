import React from 'react'
import randomColor from 'randomcolor'

interface PostPropsInterface {
   title: string
   body: string
}

export const Post = ({title, body}: PostPropsInterface) => {
   const coloBackground = randomColor()

   return (
      <div className={'post_container'} style={{backgroundColor: coloBackground}}>
         <div className={'post_title'}>{title}</div>
         <div className={'post_body'}>{body}</div>
      </div>
   )
}

