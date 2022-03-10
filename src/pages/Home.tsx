import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { fetchGetPosts } from '../DAL/fetchPost'
import { nanoid } from 'nanoid'
import { Carousel } from 'antd'
import 'antd/dist/antd.css'
import randomColor from 'randomcolor'
import { useNavigate } from 'react-router-dom'
import { PostInterface } from '../types/redux/posts/postsReducerType'

export const Home: React.FC = () => {
   const {auth} = useTypedSelector(state => state.auth)
   const {username} = useTypedSelector(state => state.user)
   const {posts, errors} = useTypedSelector(state => state.post)
   const dispatch = useDispatch()
   const navigate = useNavigate()

   React.useEffect(() => {
      if (!auth) {
         return
      }
      dispatch(fetchGetPosts())
   }, [])

   const style = {
      height: "260px",
      color: "#fff",
      lineHeight: "260px",
      background: randomColor(),
      borderRadius: "20px"
   }


   const carouselRender = (posts: PostInterface[]): JSX.Element => (
      <Carousel autoplay style={{width: '100%', height: '100%'}} effect={'fade'}>
         {posts.map(post => (
            <div key={nanoid()} onClick={() => navigate(`/posts/${post.id}`)}>
               <h2 style={style}>{post.title}</h2>
            </div>
         ))}
      </Carousel>
   )

   return (
      <div>
         {
            auth
               ? (
                  <div className={'home_page_content'}>
                     <h3 className={'homepage_logo'}>Welcome, {username} ! Здесь новые посты.</h3>
                     {carouselRender(posts)}
                     {posts.length === 0 ? <h2>Постов пока нет</h2> : null}
                     {errors ? <h2>{errors}</h2> : null}
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
