import { PostActions, PostEnumActions } from '../../../types/redux/posts/postsActionsType'
import { PostInterface } from '../../../types/redux/posts/postsReducerType'

export const startFetchPosts = (): PostEnumActions => {
   return {
      type: PostActions.START_FETCH_POSTS
   }
}

export const successFetchPosts = (posts: PostInterface[] | []): PostEnumActions => {
   return {
      type: PostActions.SUCCESS_FETCH_POSTS,
      payload: posts
   }
}

export const successFetchOnePost = (post: PostInterface): PostEnumActions => {
   return {
      type: PostActions.CHECK_ONE_POST,
      payload: post
   }
}

export const clearOnePost = ():PostEnumActions => {
   return {
      type: PostActions.CLEAR_ONE_POST
   }
}

export const errorFetchPosts = (errors: string | string[] | null): PostEnumActions => {
   return {
      type: PostActions.ERROR_FETCH_POSTS,
      payload: errors
   }
}

export const createFetchPost = (post: PostInterface): PostEnumActions => {
   return {
      type: PostActions.CREATE_NEW_POST,
      payload: post
   }
}