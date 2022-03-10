import { ChatActions } from '../types/redux/chat/chatActionType'
import { Dispatch } from 'redux'
import {
   errorFetchChats,
   getMessagesInCurrentChat,
   sendMessageInCurrentChat,
   startFetchChats, startFetchMessages
} from '../redux/chat/actions/actionCreator'
import axios from 'axios'

export const getMessagesCurrentChat =
   (chatId: string) =>
      async (dispatch: Dispatch<ChatActions>) => {
         try {
            const token = localStorage.getItem('token')
            dispatch(startFetchChats())
            const response = await axios({
               method: 'GET',
               url: `http://localhost:8000/api/messages/${chatId}`,
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            dispatch(getMessagesInCurrentChat(response.data.data))
         } catch (error) {
            dispatch(errorFetchChats('Messages not a get.'))
         }
      }

export const postMessage =
   (idChat: string,
    messageBody: string,
    author: string | null) =>
      async (dispatch: Dispatch<ChatActions>) => {
         if (typeof author === null) {
            return
         }

         try {
            const token = localStorage.getItem('token')
            dispatch(startFetchMessages())
            const response = await axios({
               method: 'POST',
               url: 'http://localhost:8000/api/message',
               data: {
                  idRoom: idChat,
                  messageBody,
                  author
               },
               headers: {
                  Authorization: `Bearer ${token}`
               }
            })
            dispatch(sendMessageInCurrentChat(response.data.data))
         } catch (error) {
            dispatch(errorFetchChats('Error fetch messages.'))
         }
      }