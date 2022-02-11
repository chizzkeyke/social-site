import React from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { fetchOnePostThunk } from '../DAL/fetchPost'
import { useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import { clearOnePost } from '../redux/posts/actions/actionCreator'
import { Comment, Tooltip, Avatar, Affix } from 'antd'

export const SinglePostPage = () => {
   const [container, setContainer] = React.useState<HTMLDivElement | null>(null)
   const {id} = useParams()
   const dispatch = useDispatch()
   const {post, loader} = useTypedSelector(state => state.post)

   React.useEffect(() => {
      dispatch(fetchOnePostThunk(id))

      return () => {
         dispatch(clearOnePost())
      }
   }, [])

   return (
      <>
         {
            loader
               ? <div className={'page_one_post_loader'}><Loader/></div>
               : (
                  <div className={'page_one_post_layout'}>
                     <div className={'page_one_post_content'}>
                        <h2 className={'post_page_post_title'}>{post?.title}</h2>
                        <div className={'post_page_post_body'}>{post?.body}</div>
                     </div>
                     <div className={'page_one_post_comments'} ref={setContainer}>
                        <Affix target={() => container}>
                           {}
                        </Affix>
                        Comments
                     </div>
                  </div>
               )
         }
      </>
   )
}