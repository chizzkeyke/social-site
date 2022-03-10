export interface MessageInterface {
   body: string
   author: string
   chat_id: string
   unread: boolean,
}

export interface ChatInterface {
   author: string
   partner: string
   id: string
   messages: MessageInterface[]
}

export interface ChatStateReducerInterface {
   currentChat: any
   chats: ChatInterface[]
   loadingChat: boolean
   loadingMessages: boolean
   error: string | null
}