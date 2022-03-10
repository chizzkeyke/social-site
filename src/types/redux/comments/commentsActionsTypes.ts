import {CommentInterface} from './commentsReducerType'

export enum commentsConstants {
   START_FETCH_COMMENTS = 'start fetch comments',
   SUCCESS_FETCH_COMMENTS = 'success fetch comments',
   ERROR_FETCH_COMMENTS = 'error fetch comments',
   UPDATE_COMMENT = 'update fetch comment',
   CREATE_NEW_COMMENT = 'create new comment',
   CLEAR_COMMENTS = 'clear comments'
}

interface StartFetchCommentsInterface {
   type: commentsConstants.START_FETCH_COMMENTS
}

interface SuccessFetchCommentsInterface {
   type: commentsConstants.SUCCESS_FETCH_COMMENTS,
   payload: CommentInterface[]
}

interface CreateNewCommentInterface {
   type: commentsConstants.CREATE_NEW_COMMENT,
   payload: CommentInterface
}

interface UpdateCommentInterface {
   type: commentsConstants.UPDATE_COMMENT,
   payload: {
      idComment: string, body: string
   }
}

interface ErrorFetchCommentsInterface {
   type: commentsConstants.ERROR_FETCH_COMMENTS,
   payload: string | null
}

interface ClearCommentsInterface {
   type: commentsConstants.CLEAR_COMMENTS
}

export type CommentsActions =
   StartFetchCommentsInterface |
   SuccessFetchCommentsInterface |
   ErrorFetchCommentsInterface |
   ClearCommentsInterface |
   CreateNewCommentInterface |
   UpdateCommentInterface