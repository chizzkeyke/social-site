import React from 'react'
import { Post } from '../components/Post'
import { useTypedSelector } from '../hooks/useTypedSelector'

export const PostsPage: React.FC = () => {
   const {posts, loader} = useTypedSelector(state => state.post)

   React.useEffect(() => {

   }, [])

   return (
      <div className={'post_page_container'}>

      </div>
   )
}