import { Dispatch } from 'redux'
import axios from 'axios'
import {
   createFetchPost,
   deletePost,
   errorFetchPosts,
   startFetchPosts,
   successFetchOnePost,
   successFetchPosts,
   updateFetchPost,
   getPostsAuthUser
} from '../redux/posts/actions/actionCreator'
import { PostActions, PostEnumActions } from '../types/redux/posts/postsActionsType'

interface CreatePostDataInterface {
   title: string
   body: string
}

interface UpdatePostDataInterface {
   title: string
   body: string
   idPost: string
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
      dispatch(errorFetchPosts('Error fetch Post'))
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

export const fetchUpdatePostThunk = ({idPost, body, title}: UpdatePostDataInterface) =>
   async (dispatch: Dispatch<PostEnumActions>) => {
      const token = localStorage.getItem('token')
      try {
         dispatch(startFetchPosts())
         const response = await axios({
            url: 'http://localhost:8000/api/post',
            method: 'PUT',
            headers: {
               Authorization: `Bearer ${token}`
            },
            data: {
               title,
               body,
               idPost
            }
         })
         dispatch(updateFetchPost(response.data.data))
      } catch (e) {
         dispatch({type: PostActions.ERROR_FETCH_POSTS, payload: 'Error update post'})
      }
   }

export const fetchPostsAuthUserThunk = (username: string | null) =>
   async (dispatch: Dispatch<PostEnumActions>) => {
      const token = localStorage.getItem('token')
      try {
         dispatch(startFetchPosts())
         const response = await axios({
            method: 'GET',
            url: `http://localhost:8000/api/posts/${username}`,
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         dispatch(getPostsAuthUser(response.data.data))
      } catch (e) {
         dispatch({type: PostActions.ERROR_FETCH_POSTS, payload: 'Error get posts.'})
      }
   }


export const fetchDeletePostThunk = (id: string) =>
   async (dispatch: Dispatch<PostEnumActions>) => {
      const token = localStorage.getItem('token')
      try {
         dispatch(startFetchPosts())
         await axios({
            method: 'DELETE',
            url: `http://localhost:8000/api/post/${id}`,
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         dispatch(deletePost(id))
      } catch (e) {
         dispatch({type: PostActions.ERROR_FETCH_POSTS, payload: 'Error delete post.'})
      }
   }

export const fetchOnePostThunk = (id: string | undefined) =>
   async (dispatch: Dispatch<PostEnumActions>) => {
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
         dispatch(errorFetchPosts('Request error.'))
      }
   }
