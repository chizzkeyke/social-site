import { Dispatch } from 'redux'
import { ChatActions } from '../types/redux/chat/chatActionType'
import axios, { Method } from 'axios'
import {
   startFetchChats,
   successFetchChats,
   errorFetchChats,
   startFetchMessages
   } from '../redux/chat/actions/actionCreator'

const baseURL = 'http://localhost:8000/api/chats'

export const chatsActionsThunk = (method: Method, data?: { partner: string; author: string | null }) => async (dispatch: Dispatch<ChatActions>) => {
   const token = await localStorage.getItem('token')
   const dataIsAdding = method === 'post' || 'POST' ? data : null
   try {
      dispatch(startFetchMessages())
      const response = await axios({
         method: method,
         url : baseURL,
         data: dataIsAdding,
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      dispatch(successFetchChats(response.data))
   } catch (error) {
      dispatch(errorFetchChats('Error fetch Chats'))
   }
}

export const fetchChatsThunk = () => async (dispatch: Dispatch<ChatActions>) => {
   try {
      const token = localStorage.getItem('token')
      dispatch(startFetchChats())
      const response = await axios({
         method: 'GET',
         headers: {
            Authorization: `Bearer ${token}`
         },
         url: 'http://localhost:8000/api/chats'
      })
      dispatch(successFetchChats(response.data.data))
   } catch (e) {
      dispatch(errorFetchChats('Chats is not get.'))
   }
}