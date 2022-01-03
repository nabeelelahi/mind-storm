import React from 'react'

export default function ChatSection() {
    return (
        <div className='chat-container'>
            <div className='messages p-2'>
                <div className='bg-primary there-bubble p-2 text-white align-self-end'>Hi</div>
                <div className='bg-light my-bubble p-2 text-primary align-self-start'>Hello</div>
            </div>
            <div className='send-message d-flex align-items-center'>
                <input placeholder='type your message..' className='px-2 chat-input border bg-light shadow' type='text' />
                <button className="chat-btn btn btn-primary">Chat</button>
            </div>
        </div>
    )
}

 
