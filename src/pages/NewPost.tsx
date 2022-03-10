import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import {
   fetchCreatePostThunk,
   fetchPostsAuthUserThunk,
   fetchUpdatePostThunk } from '../DAL/fetchPost'
import { ListPosts } from '../components/ListPosts'
import { Button, Modal } from 'antd'

export const CreatePostPage = () => {
   const [title, setTitle] = React.useState<string>('')
   const [body, setBody] = React.useState<string>('')
   const [id, setId] = React.useState<string>('')
   const [disabled, setIsDisabled] = React.useState<boolean>(false)
   const [showListPosts, setShowListPosts] = React.useState<boolean>(false)
   const {postsAuthUser} = useTypedSelector(state => state.post)
   const {username} = useTypedSelector(state => state.user)

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const {pathname} = useLocation()
   const path: boolean = pathname === '/new-post'
   const titlePage: string = path ? 'Create New Post' : 'Update Post'

   React.useEffect(() => {
      dispatch(fetchPostsAuthUserThunk(username))
   }, [])

   const disabledAll = (): boolean => {
      return title === '' || body === ''
   }

   const choosePost = (id: string) => {
      setId(id)
      setShowListPosts(false)
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsDisabled(true)

      if (path) {
         dispatch(fetchCreatePostThunk({
            title,
            body,
         }))
      } else {
         dispatch(fetchUpdatePostThunk({
            title,
            body,
            idPost: id
         }))
      }

      setTimeout(() => {
         navigate('/')
      }, 1000)
   }

   const renderModal = (): JSX.Element => (
      <>
         <Button type={'primary'} onClick={() => setShowListPosts(true)}>Show List Posts</Button>
         <Modal
            visible={showListPosts}
            onCancel={() => setShowListPosts(false)}>
            <ListPosts
               posts={postsAuthUser}
               onClick={choosePost}
            />
         </Modal>
      </>
   )

   return (
      <div className={'content_new_post'}>
         <h2 className={'new_post_title'}>{titlePage}</h2>
         <form className={'form_new_post'} onSubmit={handleSubmit}>
            <input
               type="text"
               disabled={disabled}
               placeholder={'Title'}
               value={title}
               onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
            />
            {!path && (<input
               type="text"
               disabled={disabled}
               placeholder={'Post ID'}
               value={id}
               onChange={(e: React.FormEvent<HTMLInputElement>) => setId(e.currentTarget.value)}
            />)}
            <textarea
               disabled={disabled}
               placeholder={'Body'}
               value={body}
               onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value)}
            />
            <button disabled={disabledAll()} type={'submit'}>Submit</button>
         </form>
         {!path ? renderModal() : null}
      </div>
   )
}