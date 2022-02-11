import {CommentInterface} from './commentsReducerType'

export enum commentsConstants {
   START_FETCH_COMMENTS = 'start fetch comments',
   SUCCESS_FETCH_COMMENTS = 'success fetch comments',
   ERROR_FETCH_COMMENTS = 'error fetch comments'
}

interface StartFetchCommentsInterface {
   type: commentsConstants.START_FETCH_COMMENTS
}

interface SuccessFetchCommentsInterface {
   type: commentsConstants.SUCCESS_FETCH_COMMENTS,
   payload: CommentInterface[]
}

interface ErrorFetchCommentsInterface {
   type: commentsConstants.ERROR_FETCH_COMMENTS,
   payload: string | null
}

export type CommentsActions =
   StartFetchCommentsInterface |
   SuccessFetchCommentsInterface |
   ErrorFetchCommentsInterface