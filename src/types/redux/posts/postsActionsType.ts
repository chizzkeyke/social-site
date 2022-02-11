import { PostInterface } from './postsReducerType'

export enum PostActions {
   START_FETCH_POSTS = 'start fetch posts',
   SUCCESS_FETCH_POSTS = 'success fetch posts',
   ERROR_FETCH_POSTS = 'error fetch posts',
   CREATE_NEW_POST = 'create new post',
   UPDATE_POST = 'update post',
   DELETE_POST = 'delete post',
   CHECK_ONE_POST = 'check one post',
   CLEAR_ONE_POST = 'clear one post'
}

interface PostActionStartInterface {
   type: PostActions.START_FETCH_POSTS
}

interface PostActionSuccessInterface {
   type: PostActions.SUCCESS_FETCH_POSTS,
   payload: PostInterface[] | []
}

interface PostActionErrorInterface {
   type: PostActions.ERROR_FETCH_POSTS,
   payload: string[] | string | null
}

interface PostActionCheckOneInterface {
   type: PostActions.CHECK_ONE_POST,
   payload: PostInterface
}

interface PostActionClearOnePost {
   type: PostActions.CLEAR_ONE_POST,
}

interface PostActionCreateInterface {
   type: PostActions.CREATE_NEW_POST,
   payload: PostInterface
}

interface PostActionUpdateInterface {
   type: PostActions.UPDATE_POST,
   payload: PostInterface
}

interface PostActionDeleteInterface {
   type: PostActions.DELETE_POST,
   payload: number
}

export type PostEnumActions =
   PostActionStartInterface |
   PostActionSuccessInterface |
   PostActionErrorInterface |
   PostActionCreateInterface |
   PostActionUpdateInterface |
   PostActionDeleteInterface |
   PostActionCheckOneInterface |
   PostActionClearOnePost