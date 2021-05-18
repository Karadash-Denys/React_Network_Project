import React, { useEffect, useState } from "react"



const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType =  {
    message: string
    photo: string
    userId: number
    userName: string
  } 

const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}
const Messages: React.FC = () => {

    useEffect(() => {
        wsChanel.addEventListener('message', (e:MessageEvent) => {
            setMessajes((prevMes)=>[...prevMes,...JSON.parse(e.data)]);
        })
    }, [])
    
    const[ messages,setMessajes ] = useState<ChatMessageType[]>([])

    return (
        <div style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((mes: ChatMessageType,index ) => (
                <Message key={index} message={mes} />
            ))}
            
        </div>
    )
}

const Message: React.FC<{message:ChatMessageType}> = ({message}) => {
    
    return (
        <div>
            <img style={{width:'30px'}}  src={message.photo} alt="yo" /> <b>{message.userName}</b>
            <br />
            <p>{message.message}</p>
            <hr />
        </div>
    )
}
const AddMessageForm: React.FC = () => {

    const[message,setMessaje] = useState('')

    const sendMessage = () => {
        if(!message)return
        wsChanel.send(message)
        setMessaje('')
    }

    return (
        <div>
            <div>
                <textarea value={message} onChange={(e)=>setMessaje(e.target.value)} ></textarea>
            </div>
            <div>
                <button onClick={sendMessage} >send</button>
            </div>
        </div>
    )
}

export default ChatPage
