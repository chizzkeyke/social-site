import { CommentsActions, commentsConstants } from '../../../types/redux/comments/commentsActionsTypes'
import { CommentInterface } from '../../../types/redux/comments/commentsReducerType'

export const startFetchComments = (): CommentsActions => {
   return {
      type: commentsConstants.START_FETCH_COMMENTS
   }
}

export const successFetchComments = (comments: CommentInterface[]): CommentsActions => {
   return {
      type: commentsConstants.SUCCESS_FETCH_COMMENTS,
      payload: comments
   }
}

export const errorFetchComments = (error: string): CommentsActions => {
   return {
      type: commentsConstants.ERROR_FETCH_COMMENTS,
      payload: error
   }
}