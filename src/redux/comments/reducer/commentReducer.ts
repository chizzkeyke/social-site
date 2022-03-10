import { commentsStateInterface } from '../../../types/redux/comments/commentsReducerType'
import { CommentsActions, commentsConstants } from '../../../types/redux/comments/commentsActionsTypes'

const initialStateCommentsReducer: commentsStateInterface = {
   comments: [],
   loadingComments: false,
   errors: null
}

export function commentsReducer(state = initialStateCommentsReducer, action: CommentsActions): commentsStateInterface {
   switch (action.type) {
      case commentsConstants.START_FETCH_COMMENTS: {
         return {
            ...state,
            loadingComments: true
         }
      }
      case commentsConstants.SUCCESS_FETCH_COMMENTS: {
         return {
            ...state,
            loadingComments: false,
            comments: action.payload
         }
      }
      case commentsConstants.ERROR_FETCH_COMMENTS: {
         return {
            ...state,
            loadingComments: false,
            errors: action.payload
         }
      }
      case commentsConstants.CREATE_NEW_COMMENT: {
         return {
            ...state,
            loadingComments: false,
            comments: [action.payload, ...state.comments]
         }
      }

      case commentsConstants.CLEAR_COMMENTS: {
         return initialStateCommentsReducer
      }


      default: return state
   }
}