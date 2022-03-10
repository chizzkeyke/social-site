import React from 'react'
import { PostInterface } from '../types/redux/posts/postsReducerType'
import { nanoid } from 'nanoid'
import { Button } from 'antd'

interface ListPostsPropsInterface {
   posts: PostInterface[],
   onClick: (id: string) => void
}

export const ListPosts: React.FC<ListPostsPropsInterface> = ({posts, onClick}): JSX.Element => {

   return (
      <ul className={'list_posts'}>
         {posts.map(post => (
            <li
               key={nanoid()}
            >
               {post.title}
               <Button onClick={() => onClick(post.id)}>Choose</Button>
            </li>
         ))}
      </ul>
   )
}