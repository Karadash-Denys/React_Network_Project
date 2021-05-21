

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

type SubscriberMessageType = (messages:ChatMessageType[])=>void 
type SubscriberStatusType = (status:StatusType)=>void
export type StatusType = 'pending' | 'ready' | 'error'
type EventsNamesType = 'messages-resived' | 'status-changed'

let subscribers = {
    'messages-resived': [] as SubscriberMessageType[],
    'status-changed': [] as SubscriberStatusType[]
}

let ws: WebSocket | null = null

const closeHandler = () => {
    subscribers['status-changed'].forEach(sub=>sub('pending'))
    setTimeout(createChanel,3000)
}

const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener("message",onMessageHandler )
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler )
}

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    subscribers['status-changed'].forEach(sub=>sub('pending'))
    ws.addEventListener("close",closeHandler )
    ws.addEventListener("message", onMessageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
   
}

const onMessageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers['messages-resived'].forEach(sub=>sub(newMessage))
}
const openHandler = () => {
    subscribers['status-changed'].forEach(sub=>sub('ready'))
}
const errorHandler = () => {
    subscribers['status-changed'].forEach(sub => sub('error'))
    console.error('RESTART PAGE');
    
}


export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers["messages-resived"] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNamesType, callback: SubscriberMessageType | SubscriberStatusType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(sub=>sub !== callback)
        }
    },
    unSubscribe(eventName: EventsNamesType, callback: SubscriberMessageType | SubscriberStatusType) {
        //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(sub=>sub !== callback)
    },
    sendMessage(message:string) {
        ws?.send(message)
    }
}