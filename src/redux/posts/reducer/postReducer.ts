import { PostInterface, PostStateInterface } from '../../../types/redux/posts/postsReducerType'
import { PostActions, PostEnumActions } from '../../../types/redux/posts/postsActionsType'

const initialStatePosts: PostStateInterface = {
   posts: [],
   post: null,
   loader: false,
   errors: null,
   postsAuthUser: []
}

export const postReducer = (state:PostStateInterface = initialStatePosts, action: PostEnumActions): PostStateInterface => {
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

      case PostActions.GET_POSTS_AUTH_USER: {
         return {
            ...state,
            loader: false,
            postsAuthUser: action.payload
         }
      }

      case PostActions.CHECK_ONE_POST: {
         return {
            ...state,
            loader: false,
            post: action.payload
         }
      }

      case PostActions.CLEAR_ONE_POST: {
         return {
            ...state,
            post: null
         }
      }

      case PostActions.ERROR_FETCH_POSTS: {
         return {
            ...state,
            loader: false,
            errors: action.payload
         }
      }

      case PostActions.CREATE_NEW_POST: {
         const {title, body, author, id} = action.payload

         const newPost: PostInterface = {
            id,
            title,
            body,
            author
         }

         return {
            ...state,
            posts: [...state.posts, newPost]
         }
      }

      case PostActions.UPDATE_POST: {
         const {id, body} = action.payload

         return {
            ...state,
            posts: state.posts?.map((post) => {
               if (post.id === id) {
                  return {
                     ...post,
                     body,
                  }
               }
               return post
            })
         }
      }

      case PostActions.DELETE_POST: {
         const id = action.payload
         return {
            ...state,
            postsAuthUser: state.postsAuthUser.filter(post => post.id !== id),
         }
      }

      default: {
         return state
      }
   }
}