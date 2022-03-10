import React from 'react'
import { Button } from 'antd'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ChatInterface, MessageInterface } from '../types/redux/chat/chatReducerType'
import { nanoid } from 'nanoid'
import { socket } from '../utils/socket'
import { useDispatch } from 'react-redux'
import { fetchChatsThunk } from '../DAL/fetchChats'
import { Loader } from '../components/Loader'
import { chooseChat } from '../redux/chat/actions/actionCreator'
import { Navigate } from 'react-router-dom'
import { postMessage } from '../DAL/fetchMessage'
import { getMessagesCurrentChat } from '../DAL/fetchMessage'
import { sendMessageInCurrentChat } from '../redux/chat/actions/actionCreator'

interface MessagePropsInterface {
   author: string
   body: string
}

const Message: React.FC<MessagePropsInterface> = ({author, body}): JSX.Element => {
   const {username} = useTypedSelector(state => state.user)
   const layout = author === username ? 'message_layout_my' : 'message_layout'
   const toggleBody = author === username ? 'message my' : 'message'
   const toggleMessageAuthor = author === username ? 'message_author my' : 'message_author'
   const toggleMessageBody = author === username ? 'message_body my' : 'message_body'

   return (
      <div className={layout}>
         <div className={toggleBody}>
            <div className={toggleMessageAuthor}>{author}</div>
            <div className={toggleMessageBody}>{body}</div>
         </div>
      </div>
   )
}

interface ChatControlInterface {
   value: string
   sendMessage: () => void
   disabled?: boolean
   onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const ChatControl: React.FC<ChatControlInterface> = ({value, sendMessage, onChange, disabled}) => {
   return (
      <div className={'chat_input'}>
         <textarea
            value={value}
            onChange={onChange}
         />
         <Button
            disabled={disabled}
            onClick={sendMessage}
            type={'primary'}
            size={'large'}
         >
            Send
         </Button>
      </div>
   )
}

interface MessageAreaPropsInterface {
   messages: MessageInterface[]
   loading: boolean
}

const MessageArea: React.FC<MessageAreaPropsInterface> = ({messages, loading}): JSX.Element => {

   return (
      <div className={'messages_area'}>
         {
            typeof messages === 'undefined'
               ? <div className={'messages_area'}>Выберите чат</div>
               : null
         }
         {loading ? <Loader/> : null}
         {messages?.length === 0
            ? (
               <h2>Сообщений нет</h2>
            )
            : (
               <>
                  {
                     messages?.map((message) => (
                        <Message body={message.body}
                                 author={message.author}
                                 key={nanoid()}/>))
                  }
               </>
            )
         }
      </div>
   )
}

interface ListChatsPropsInterface {
   chats: ChatInterface[]
   loading: boolean
   choose: (id: string) => void
}

const ListChats: React.FC<ListChatsPropsInterface> = ({chats, loading, choose}): JSX.Element => {
   const {username} = useTypedSelector(state => state.user)

   return (
      <>
         {loading
            ? <Loader/>
            : (<ul className={'chat_list'}>
               {
                  chats.length === 0
                     ? <h3>Пока нет чатов</h3>
                     : (<>
                        {chats.map(chat =>
                           <li key={nanoid()}
                               onClick={() => choose(chat.id)}
                               className={'chat_list_item'}
                           >
                              {username !== chat.author ? chat.author : chat.partner}
                           </li>)}
                     </>)
               }
            </ul>)}
      </>
   )
}

interface ChatContainerPropsInterface {
   children: React.ReactChild | React.ReactNode
}

const ChatContainer: React.FC<ChatContainerPropsInterface> = ({children}): JSX.Element => (
   <div className={'chat'}>
      {children}
   </div>
)

export const ChatPage = () => {
   const [textMessage, setTextMessage] = React.useState<string>('')
   const {chats, loadingMessages, loadingChat, currentChat} = useTypedSelector(state => state.chat)
   const {auth} = useTypedSelector(state => state.auth)
   const {username} = useTypedSelector(state => state.user)
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(fetchChatsThunk())
   }, [])

   React.useEffect(() => {
      socket.on('MESSAGE:RECEIVED', (newMessage: MessageInterface) => {
         dispatch(sendMessageInCurrentChat(newMessage))
      })
   }, [socket])

   if (!auth) {
      return <Navigate to={'/'}/>
   }

   const chooseChatHandler = (id: string) => {
      const dataSocket = {
         roomId: id,
         username
      }

      socket.emit('ROOM:ENTER', dataSocket)
      dispatch(chooseChat(id))
      dispatch(getMessagesCurrentChat(id))
   }

   const sendMessage = (): void => {
      dispatch(postMessage(currentChat?.id, textMessage, username))
      setTextMessage('')

      const messageSocketData = {
         idRoom: currentChat.id,
         messageBody: textMessage,
         author: username
      }
      socket.emit('MESSAGE:SEND', messageSocketData)
   }

   const handlerComment = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
      setTextMessage(event.target.value)
      socket.emit('MESSAGE:WRITING', {roomID: currentChat?.id})
   }

   const checkOnEmptinessTextArea = (): boolean => {
      return textMessage == ''
   }

   return (
      <div className={'chat_layout'}>
         <ListChats
            chats={chats}
            loading={loadingChat}
            choose={chooseChatHandler}
         />
         <ChatContainer>
            <MessageArea messages={currentChat?.messages} loading={loadingMessages}/>
            <ChatControl
               value={textMessage}
               sendMessage={sendMessage}
               onChange={handlerComment}
               disabled={checkOnEmptinessTextArea()}
            />
         </ChatContainer>
      </div>
   )
}

