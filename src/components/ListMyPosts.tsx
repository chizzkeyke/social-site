import React from 'react'
import { nanoid } from 'nanoid'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { CloseOutlined, HighlightOutlined } from '@ant-design/icons'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchDeletePostThunk, fetchPostsAuthUserThunk } from '../DAL/fetchPost'

export const ListPosts: React.FC = (): JSX.Element => {
   const dispatch = useDispatch()
   const {postsAuthUser} = useTypedSelector(state => state.post)
   const {username} = useTypedSelector(state => state.user)
   const navigate = useNavigate()

   React.useEffect(() => {
      dispatch(fetchPostsAuthUserThunk(username))
   }, [])

   const deletePost = (id: string) => {
      dispatch(fetchDeletePostThunk(id))
   }

   return (
      <>
         {
            postsAuthUser?.length === 0
               ? (
                  <div className={'list_posts_no'}>
                     <h2>Вы не создали ни одного поста</h2>
                     <Button
                        type={'primary'}
                        onClick={() => navigate('/new-post')}
                        icon={<HighlightOutlined />}
                     >
                        Хотите создать новый ?
                     </Button>
                  </div>
               )
               : (
                  <ul className={'list_posts_layout'}>
                     {postsAuthUser?.map(post => (
                        <li className={'list_posts_item'} key={nanoid()}>
                           <NavLink to={`/posts/${post.id}`}>{post.title}</NavLink>
                           <Button onClick={() => deletePost(post.id)} icon={<CloseOutlined/>}
                                   style={{backgroundColor: 'red', border: 'none'}}/>
                        </li>
                     ))}
                  </ul>
               )
         }
      </>
   )
}