
import {  InferActionsType,ThunkType } from './Redux_store'
import { chatAPI, ChatMessageType, StatusType } from '../api/chat_api'
import { Dispatch } from 'redux'









const initialState = {
    messages: [] as ChatMessageType[],
    status: 'panding' as StatusType
}


type ActionType = InferActionsType<typeof actions>
export type InitialStateType = typeof initialState



const chatReduser = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'MESSAGES_RESAIVED':
            return {
                ...state,
                messages:[...state.messages,...action.payload.messages]
            }
        case 'STATUS_CHENGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }


}


export const actions = {
    messagesResaived :(messages:ChatMessageType[]) =>({ type: 'MESSAGES_RESAIVED', payload: {messages} } as const),
    statusChanged :(status: StatusType) =>({ type: 'STATUS_CHENGED', payload: {status} } as const)
}




let _newMessageHandler : ((messages:ChatMessageType[]) => void) | null = null
let _statusChangedHandler : ((status: StatusType) => void) | null = null

const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesResaived(messages))
        }
    }
    return _newMessageHandler
}
const statusChangedHandler = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType<ActionType> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-resived',newMessageHandler(dispatch))
    chatAPI.subscribe('status-changed',statusChangedHandler(dispatch))
}
export const stopMessagesListening = ():ThunkType<ActionType> => async (dispatch) => {
    chatAPI.unSubscribe("messages-resived",newMessageHandler(dispatch))
    chatAPI.unSubscribe('status-changed',statusChangedHandler(dispatch))
    chatAPI.stop()
}
export const sendMessageTh = (message:string):ThunkType<ActionType> => async (dispatch) => {
    chatAPI.sendMessage(message)
}




export default chatReduser



