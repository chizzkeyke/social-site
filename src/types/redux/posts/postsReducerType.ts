export interface PostInterface {
   id: string
   title: string
   body: string
   author: string
}

export interface PostStateInterface {
   posts: PostInterface[]
   post: PostInterface | null
   loader: boolean
   errors: string[] | string | null,
   postsAuthUser: PostInterface[] | []
}