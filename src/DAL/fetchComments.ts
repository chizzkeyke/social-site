import { CommentsActions } from '../types/redux/comments/commentsActionsTypes'
import { Dispatch } from 'redux'
import { startFetchComments, successFetchComments, errorFetchComments, createNewComment } from '../redux/comments/actions/actionCreator'
import axios from 'axios'

export const fetchGetCommentsActionThunk = (idPost: string | undefined) =>
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

export const fetchPostCommentActionThunk = (idPost: string, body: string, author: string | null) =>
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
         dispatch(createNewComment(response.data.data))
      } catch (e) {
         dispatch(errorFetchComments('Error Loading Data User'))
      }
   }

export const fetchUpdateCommentActionThunk = () => (dispatch: Dispatch<CommentsActions>) => {

}

