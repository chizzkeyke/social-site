import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {fetchCreatePostThunk} from '../DAL/fetchPost'

export const CreatePostPage = () => {
   const [title, setTitle] = React.useState<string>('')
   const [body, setBody] = React.useState<string>('')
   const [id, setId] = React.useState<number | string>('')
   const [disabled, setIsDisabled] = React.useState<boolean>(false)

   const navigate = useNavigate()
   const dispatch = useDispatch()
   const {pathname} = useLocation()
   const path: boolean = pathname === '/new-post'
   const titlePage: string = path ? 'Create New Post' : 'Update Post'

   const disabledBtn = (): boolean => {
      return title === '' && body === ''
   }

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsDisabled(true)
      dispatch(fetchCreatePostThunk({
         title,
         body,
      }))
      setTimeout(() => {
         return navigate('/')
      }, 1000)
   }

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
            <button disabled={disabled || disabledBtn()} type={'submit'}>Submit</button>
         </form>
      </div>
   )
}