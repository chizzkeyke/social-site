export interface AuthStateInterface {
   auth: boolean
   loading: boolean
   error: string[] | [] | null | string | unknown
   token: string | null
}

