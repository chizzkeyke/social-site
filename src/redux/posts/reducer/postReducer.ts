interface PostInterface {
   title: string
   body: string
   author: string
}

interface PostStateInterface {
   posts: PostInterface[] | null
   loader: boolean,
   errors: any[] | null
}

const initialStatePosts: PostStateInterface = {
   posts: null,
   loader: false,
   errors: null
}

enum PostActions {
   START_FETCH_POSTS = 'start fetch posts',
   SUCCESS_FETCH_POSTS = 'success fetch posts',
   ERROR_FETCH_POSTS = 'error fetch posts'
}

interface PostActionStartInterface {
   type: PostActions.START_FETCH_POSTS
}

interface PostActionSuccessInterface {
   type: PostActions.SUCCESS_FETCH_POSTS,
   payload: PostInterface[] | unknown
}

interface PostActionErrorInterface {
   type: PostActions.ERROR_FETCH_POSTS,
   payload: string[] | unknown
}

export type PostEnumActions = PostActionStartInterface | PostActionSuccessInterface | PostActionErrorInterface

export const postReducer = (state = initialStatePosts, action: PostEnumActions) => {
   switch (action.type) {
      case PostActions.START_FETCH_POSTS: {
         return {
            ...state,
            loader: true
         }
      }
      case PostActions.SUCCESS_FETCH_POSTS: {
         return {
            ...state,
            loader: false,
            posts: action.payload
         }
      }
      case PostActions.ERROR_FETCH_POSTS: {
         return {
            ...state,
            loader: false,
            errors: action.payload
         }
      }
      default: {
         return state
      }
   }
}