export interface UserStateReducer {
   username: string | null
   avatar: string | null
   created_post: number | null
   loading: boolean
   error: string | null
}