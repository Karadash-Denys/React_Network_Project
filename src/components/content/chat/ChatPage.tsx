import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ChatMessageType } from "../../../api/chat_api"
import { sendMessageTh, startMessagesListening, stopMessagesListening } from "../../../redux/Chat_Reduser"
import { AppStateType } from "../../../redux/Redux_store"



const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    },[])
   

    return (
        <div>
            <Messages/>
            <AddMessageForm />
        </div>
    )
}


const Messages: React.FC = () => {
    
    const messages = useSelector((state:AppStateType)=>state.chat.messages)


    return (
        <div style={{ height: "400px", overflowY: "auto" }}>
            {messages.map((mes: ChatMessageType, index) => (
                <Message key={index} message={mes} />
            ))}
        </div>
    )
}


const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img style={{ width: "30px" }} src={message.photo} alt="yo" />{" "}
            <b>{message.userName}</b>
            <br />
            <p>{message.message}</p>
            <hr />
        </div>
    )
}
const AddMessageForm: React.FC = ()=> {
    const [message, setMessaje] = useState("")


    const dispatch = useDispatch()
 

    const sendMessage = () => {
        if (!message) return
        dispatch(sendMessageTh(message))
        setMessaje('')
    }

    return (
        <div>
            <div>
                <textarea
                    value={message}
                    onChange={(e) => setMessaje(e.target.value)}
                ></textarea>
            </div>
            <div>
                <button
                    disabled={false}
                    onClick={sendMessage}
                >
                    send
                </button>
            </div>
        </div>
    )
}

export default ChatPage
