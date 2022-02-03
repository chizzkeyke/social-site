import React from 'react'

export const CreatePostPage = () => {
   const [title, setTitle] = React.useState<string>('')
   const [body, setBody] = React.useState<string>('')

   console.log(title,
      body)

   return (
      <div>
         <h2>Create New Post</h2>
         <form>
            <input
               type="text"
               placeholder={'Title'}
               value={title}
               onChange={(e:React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
            />
            <textarea
               placeholder={''}
               value={body}
               onChange={(e:React.FormEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value)}
            />
            <button>Submit</button>
         </form>
      </div>
   )
}