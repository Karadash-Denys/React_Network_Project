import React, { useEffect, useState } from "react"

export type ChatMessageType = {
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

    
    let [wsChanel,setwsChanel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('CLOSE WS')
            setTimeout(createChanel,3000)
        }
        function createChanel() {
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            if (ws !== null) {
                ws.removeEventListener('close',closeHandler)
            }
            ws.addEventListener("close",closeHandler )
            setwsChanel(ws)
        }
        createChanel()
        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])

    return (
        <div>
            <Messages wsChanel={wsChanel}/>
            <AddMessageForm wsChanel={wsChanel}/>
        </div>
    )
}
const Messages: React.FC<{wsChanel:WebSocket | null}> = ({wsChanel}) => {
    useEffect(() => {
        const onMessageHandler = (e: MessageEvent) => {
            setMessajes((prevMes) => [...prevMes, ...JSON.parse(e.data)])
        }
        wsChanel?.addEventListener("message", onMessageHandler)
        return () => {
            wsChanel?.removeEventListener('message',onMessageHandler) 
        }
    }, [wsChanel])

    const [messages, setMessajes] = useState<ChatMessageType[]>([])

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
const AddMessageForm: React.FC<{wsChanel:WebSocket | null}> = ({wsChanel})=> {
    const [message, setMessaje] = useState("")
    const [readyStatus, setReadyStatus] =
        useState<"pending" | "ready">("pending")

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus("ready")
        }
        wsChanel?.addEventListener("open", openHandler)
        return () => {
            wsChanel?.removeEventListener('open',openHandler)
        }
    }, [wsChanel])  

    const sendMessage = () => {
        if (!message) return
        wsChanel?.send(message)
        setMessaje("")
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
                    disabled={wsChanel===null||readyStatus !== "ready"}
                    onClick={sendMessage}
                >
                    send
                </button>
            </div>
        </div>
    )
}

export default ChatPage
