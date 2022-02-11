export interface CommentInterface {
   id: number | string,
   idPost: number | string,
   author: string,
   body: string
   date_created: Date
}

export interface commentsStateInterface {
   comments: CommentInterface[] | []
   loadingComments: boolean,
   errors: string | null
}