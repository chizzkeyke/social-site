import { ChatActions, chatConstants } from '../../../types/redux/chat/chatActionType'
import { ChatStateReducerInterface } from '../../../types/redux/chat/chatReducerType'

const initialState: ChatStateReducerInterface = {
   currentChat: null,
   chats: [],
   loadingChat: false,
   loadingMessages: false,
   error: null
}

export const chatReducer = (state = initialState, action: ChatActions): ChatStateReducerInterface => {
   switch (action.type) {
      case chatConstants.START_FETCH_CHATS: {
         return {
            ...state,
            loadingChat: true
         }
      }
      case chatConstants.SUCCESS_FETCH_CHATS: {
         return {
            ...state,
            loadingChat: false,
            chats: action.payload
         }
      }
      case chatConstants.ERROR_FETCH_CHATS: {
         return {
            ...state,
            loadingChat: false,
            error: action.payload
         }
      }
      case chatConstants.CREATE_NEW_CHAT: {
         return {
            ...state,
            loadingChat: false,
            chats: [...state.chats, action.payload]
         }
      }
      case chatConstants.CHOOSE_CURRENT_CHAT: {
         const chat = state.chats.filter(chat => chat.id === action.payload)[0]
         return {
            ...state,
            currentChat: chat
         }
      }
      case chatConstants.DELETE_CHAT: {
         return {
            ...state,
            chats: state.chats.filter(chat => chat.id !== action.payload)
         }
      }
      case chatConstants.GET_MESSAGES_IN_CURRENT_CHAT : {
         const messages = action.payload

         return {
            ...state,
            loadingMessages: false,
            loadingChat: false,
            currentChat: {
               ...state.currentChat,
               messages: messages
            }
         }
      }
      case chatConstants.SEND_MESSAGE_IN_CURRENT_CHAT: {
         const message = action.payload.message

         return {
            ...state,
            loadingMessages: false,
            currentChat: {
               id: state.currentChat?.id,
               author: state.currentChat?.author,
               partner: state.currentChat?.partner,
               messages : [message, ...state.currentChat?.messages]
            }
         }
      }
      default:
         return state
   }
}