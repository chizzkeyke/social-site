import { Dispatch } from 'redux'
import axios from 'axios'
import {
   startFetchPosts,
   successFetchPosts,
   errorFetchPosts,
   createFetchPost,
   successFetchOnePost
} from '../redux/posts/actions/actionCreator'
import { PostEnumActions } from '../types/redux/posts/postsActionsType'

interface CreatePostDataInterface {
   title: string
   body: string
}

export const fetchGetPosts = () => async (dispatch: Dispatch<PostEnumActions>) => {
   const token = localStorage.getItem('token')
   try {
      dispatch(startFetchPosts())
      const response = await axios({
         method: 'GET',
         url: 'http://localhost:8000/api/post',
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      dispatch(successFetchPosts(response.data.data))
   } catch (e) {
      dispatch(errorFetchPosts(e as string || e as []))
   }
}

export const fetchCreatePostThunk = ({title, body}: CreatePostDataInterface) => async (dispatch: Dispatch<PostEnumActions>) => {
   const token = localStorage.getItem('token')
   try {
      const response = await axios({
         method: 'POST',
         url: 'http://localhost:8000/api/post',
         data: {
            title, body
         },
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      dispatch(createFetchPost({
         id: response.data.id,
         title: response.data.title,
         body: response.data.body,
         author: response.data.author
      }))
   } catch (e) {
      console.log('Error')
   }
}

export const fetchOnePostThunk = (id: string | undefined) => async (dispatch: Dispatch<PostEnumActions>) => {
   const token = localStorage.getItem('token')
   try {
      dispatch(startFetchPosts())
      const response = await axios({
         method: 'GET',
         url: `http://localhost:8000/api/post/${id}`,
         headers: {
            Authorization: `Bearer ${token}`
         }
      })

      dispatch(successFetchOnePost(response.data.data))
   } catch (e) {
      dispatch(errorFetchPosts('Ошибка запроса'))
   }
}
