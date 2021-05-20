

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberType = (messages:ChatMessageType[])=>void

let subscribers =[] as SubscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createChanel,3000)
}

function createChanel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    // if (ws !== null) {
    //     ws.removeEventListener('close',closeHandler)
    // }
    ws.addEventListener("close",closeHandler )
    ws.addEventListener("message", onMessageHandler)
   
}

const onMessageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers.forEach(sub=>sub(newMessage))
}


export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener("close",closeHandler )
        ws?.removeEventListener("message",onMessageHandler )
        ws?.close()
    },
    subscribe(callback:SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(sub=>sub !== callback)
        }
    },
    unSubscribe(callback:SubscriberType) {
            subscribers = subscribers.filter(sub=>sub !== callback)
    },
    sendMessage(message:string) {
        ws?.send(message)
    }
}