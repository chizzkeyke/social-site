import { Button, Input, Form } from 'antd'
import React from 'react'

interface EditorPropsInterface {
   onChange: React.ChangeEventHandler<HTMLTextAreaElement>,
   onSubmit: React.MouseEventHandler<HTMLButtonElement>,
   submitting: boolean,
   value: string
}

export const Editor = ({onChange, onSubmit, submitting, value}: EditorPropsInterface): JSX.Element => {
   const {TextArea} = Input
   return (
      <div className={'editor_comment_layout'}>
         <Form.Item>
            <TextArea
               onChange={onChange}
               style={{
                  width: 'auto',
                  marginBottom: '10px'
               }}
               value={value}
            />
         </Form.Item>
         <Form.Item>
            <Button htmlType={'submit'} disabled={submitting} onClick={onSubmit}>Send comment</Button>
         </Form.Item>
      </div>
   )
}