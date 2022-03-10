import { ChatInterface, MessageInterface } from './chatReducerType'

export enum chatConstants {
   START_FETCH_CHATS = 'start fetch chats',
   START_FETCH_MESSAGES = 'start fetch messages',
   SUCCESS_FETCH_CHATS = 'success fetch chats',
   ERROR_FETCH_CHATS = 'error fetch chats',
   CREATE_NEW_CHAT = 'create new chat',
   DELETE_CHAT = 'delete chat',
   CHOOSE_CURRENT_CHAT = 'choose chat',
   SEND_MESSAGE_IN_CURRENT_CHAT = 'send message in current chat',
   GET_MESSAGES_IN_CURRENT_CHAT = 'get messages in current chat',
}

interface StartFetchChatsInterface {
   type: chatConstants.START_FETCH_CHATS
}

interface StartFetchMessagesInterface {
   type: chatConstants.START_FETCH_MESSAGES
}

interface SuccessFetchChatInterface {
   type: chatConstants.SUCCESS_FETCH_CHATS,
   payload: ChatInterface[]
}

interface ErrorFetchChatsInterface {
   type: chatConstants.ERROR_FETCH_CHATS,
   payload: string
}

interface CreateNewChatInterface {
   type: chatConstants.CREATE_NEW_CHAT,
   payload: ChatInterface
}

interface DeleteChatInterface {
   type: chatConstants.DELETE_CHAT,
   payload: string
}

interface ChooseChatInterface {
   type: chatConstants.CHOOSE_CURRENT_CHAT,
   payload: string
}

interface GetMessagesInCurrentChat {
   type: chatConstants.GET_MESSAGES_IN_CURRENT_CHAT,
   payload: MessageInterface[]
}

interface SendMessageInCurrentChatInterface {
   type: chatConstants.SEND_MESSAGE_IN_CURRENT_CHAT
   payload: {
      message: MessageInterface
   }
}

export type ChatActions =
   StartFetchChatsInterface |
   StartFetchMessagesInterface |
   SuccessFetchChatInterface |
   ErrorFetchChatsInterface |
   CreateNewChatInterface |
   DeleteChatInterface |
   ChooseChatInterface |
   GetMessagesInCurrentChat |
   SendMessageInCurrentChatInterface
