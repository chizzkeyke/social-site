import { commentsStateInterface } from '../../../types/redux/comments/commentsReducerType'
import { CommentsActions } from '../../../types/redux/comments/commentsActionsTypes'
import { commentsConstants } from '../../../types/redux/comments/commentsActionsTypes'

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

      default: return state
   }
}