import React from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { fetchOnePostThunk } from '../DAL/fetchPost'
import { useDispatch } from 'react-redux'
import { Loader } from '../components/Loader'
import { clearOnePost } from '../redux/posts/actions/actionCreator'
import { clearComments, } from '../redux/comments/actions/actionCreator'
import { fetchGetCommentsActionThunk, fetchPostCommentActionThunk } from '../DAL/fetchComments'
import { Comment, Avatar, Modal, Button } from 'antd'
import { nanoid } from 'nanoid'
import { CommentInterface } from '../types/redux/comments/commentsReducerType'

export const SinglePostPage = () => {
   const [isModalIsVisible, setModalIsVisible] = React.useState<boolean>(false)
   const [comment, setComment] = React.useState<string>('')
   const {post, loader} = useTypedSelector(state => state.post)
   const {username} = useTypedSelector(state => state.user)
   const {comments, loadingComments} = useTypedSelector(state => state.comments)
   const {id} = useParams()
   const dispatch = useDispatch()

   React.useEffect(() => {
      dispatch(fetchOnePostThunk(id))
      dispatch(fetchGetCommentsActionThunk(id))

      return () => {
         dispatch(clearOnePost())
         dispatch(clearComments())
      }
   }, [])

   if (id === undefined || null) {
      return <Navigate to={'/posts'}/>
   }

   const showModal = (): void => {
      setModalIsVisible(true)
   }

   const closeModalComment = (): void => {
      setModalIsVisible(false)
      setComment('')
   }

   const sendComment = (): void => {
      dispatch(fetchPostCommentActionThunk(id, comment, username))
      closeModalComment()
   }

   interface CommentsPropsInterface {
      comments: CommentInterface[]
   }

   const renderModalComment = () => {
      return (
         <>
            <Button type="primary" onClick={showModal} style={{marginTop: '10px'}} shape={'round'}>
               Send Comment
            </Button>
            <Modal
               title="Basic Modal"
               visible={isModalIsVisible}
               onOk={sendComment}
               onCancel={closeModalComment}
            >
               <textarea
                  value={comment}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}/>
            </Modal>
         </>
      )
   }

   const renderComments = ({comments}: CommentsPropsInterface): JSX.Element => {
      const errorComments = (): JSX.Element => {
         return <h2 className={'no_comments_title'}>Коментариев нет</h2>
      }

      return (
         <>
            {comments.length === 0 ? errorComments() :
               comments.map(comment => (
                  <Comment
                     style={{
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        marginBottom: '5px',
                        padding: '5px 10px'
                     }}
                     author={<a>{comment.author}</a>}
                     key={nanoid()}
                     avatar={
                        <Avatar src="https://joeschmoe.io/api/v1/random" alt={comment.author}/>
                     }
                     content={
                        <p>
                           {comment.body}
                        </p>
                     }
                  />
               ))
            }
         </>
      )
   }

   return (
      <>
         {
            loader
               ? <div className={'page_one_post_loader'}><Loader/></div>
               : (
                  <div className={'page_one_post_layout'}>
                     <div className={'page_one_post_content'}>
                        <h2 className={'post_page_post_title'}>{post?.title}</h2>
                        <div className={'post_page_post_body'}>{post?.body}</div>
                        {renderModalComment()}
                     </div>
                     <div className={'page_one_post_comments'}>
                        {
                           loadingComments
                              ? (
                                 <>
                                    <Loader/>
                                 </>
                              )
                              : renderComments({comments})
                        }
                     </div>
                  </div>
               )
         }
      </>
   )
}