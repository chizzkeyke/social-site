import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchGetPosts } from '../DAL/fetchPost'
import { nanoid } from 'nanoid'
import { Carousel } from 'antd'
import 'antd/dist/antd.css'
import randomColor from 'randomcolor'
import { useNavigate } from 'react-router-dom'

export const Home: React.FC = () => {
   const {auth} = useTypedSelector(state => state.auth)
   const {username} = useTypedSelector(state => state.user)
   const {posts} = useTypedSelector(state => state.post)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   React.useEffect(() => {
      if (!auth) {
         return
      }
      dispatch(fetchGetPosts())
   }, [])

   return (
      <div>
         {
            auth
               ? (
                  <div className={'home_page_content'}>
                     <h3 className={'homepage_logo'}>Welcome, {username} ! Здесь новые посты.</h3>
                     <Carousel autoplay effect={'fade'} style={{
                        padding: '20px 0px',
                        width: '60vw',
                        height: '55vh'
                     }}>
                        {posts.map(post => (
                           <div>
                              <div
                                 key={nanoid()}
                                 onClick={() => navigate(`/posts/${post.id}`)}
                                 className={'carousel_post'}
                                 style={{background: randomColor()}}
                              >
                                 <h2>{post.title}</h2>
                              </div>
                           </div>
                        ))}
                     </Carousel>
                  </div>
               )
               : (
                  <h3 className={'homepage_logo'}>
                     You are not authenticated.
                  </h3>
               )
         }
      </div>
   )
}
