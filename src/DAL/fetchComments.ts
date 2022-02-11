import { CommentsActions } from '../types/redux/comments/commentsActionsTypes'
import { Dispatch } from 'redux'
import { startFetchComments, successFetchComments, errorFetchComments } from '../redux/comments/actions/actionCreator'
import axios from 'axios'

export const fetchGetCommentsActionThunk = (idPost: string) =>
   async (dispatch: Dispatch<CommentsActions>) => {
      const token = localStorage.getItem('token')
      dispatch(startFetchComments())
      try {
         const response = await axios({
            method: 'GET',
            url: `http://localhost:8000/api/comment/${idPost}`,
            headers: {
               Authorization: `Bearer ${token}`
            }
         })
         dispatch(successFetchComments(response.data.data))
      } catch (e) {
         dispatch(errorFetchComments('Error Loading Data User'))
      }
   }

export const fetchPostCommentActionThunk = (idPost: string, body: string, author: string) =>
   async (dispatch: Dispatch<CommentsActions>) => {
      const token = localStorage.getItem('token')
      dispatch(startFetchComments())
      try {
         const response = await axios({
            method: 'POST',
            url: `http://localhost:8000/api/comment/${idPost}`,
            headers: {
               Authorization: `Bearer ${token}`
            },
            data: {
               idPost,
               body,
               author
            }
         })
         dispatch(successFetchComments(response.data.data))
      } catch (e) {
         dispatch(errorFetchComments('Error Loading Data User'))
      }
   }

