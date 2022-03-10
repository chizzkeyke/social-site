import { ChatActions, chatConstants } from '../../../types/redux/chat/chatActionType'
import { ChatInterface, MessageInterface } from '../../../types/redux/chat/chatReducerType'

export const startFetchChats = (): ChatActions => {
   return {
      type: chatConstants.START_FETCH_CHATS
   }
}

export const startFetchMessages = (): ChatActions => {
   return {
      type: chatConstants.START_FETCH_MESSAGES
   }
}

export const successFetchChats = (chats: ChatInterface[]): ChatActions => {
   return {
      type: chatConstants.SUCCESS_FETCH_CHATS,
      payload: chats
   }
}

export const errorFetchChats = (error: string): ChatActions => {
   return {
      type: chatConstants.ERROR_FETCH_CHATS,
      payload: error
   }
}

export const createNewChat = (chat: ChatInterface): ChatActions => {
   return {
      type: chatConstants.CREATE_NEW_CHAT,
      payload: chat
   }
}

export const deleteChat = (chatId: string): ChatActions => {
   return {
      type: chatConstants.DELETE_CHAT,
      payload: chatId
   }
}

export const getMessagesInCurrentChat = (messages: MessageInterface[]): ChatActions => {
   return {
      type: chatConstants.GET_MESSAGES_IN_CURRENT_CHAT,
      payload: messages
   }
}

export const sendMessageInCurrentChat = (message: MessageInterface): ChatActions => {
   return {
      type: chatConstants.SEND_MESSAGE_IN_CURRENT_CHAT,
      payload: {
         message,
      }
   }
}

export const chooseChat = (chatId: string): ChatActions => {
   return {
      type: chatConstants.CHOOSE_CURRENT_CHAT,
      payload: chatId
   }
}