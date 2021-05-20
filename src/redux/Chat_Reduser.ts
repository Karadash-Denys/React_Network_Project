
import {  InferActionsType,ThunkType } from './Redux_store'
import { chatAPI, ChatMessageType } from '../api/chat_api'
import { Dispatch } from 'redux'









const initialState = {
    messages:[] as ChatMessageType[] 
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
        default:
            return state
    }


}


export const actions = {
    messagesResaived :(messages:ChatMessageType[]) =>({ type: 'MESSAGES_RESAIVED', payload: {messages} } as const)
}




let _newMessageHandler : ((messages:ChatMessageType[]) => void) | null = null

const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages: ChatMessageType[]) => {
            dispatch(actions.messagesResaived(messages))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = (): ThunkType<ActionType> => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandler(dispatch))
}
export const stopMessagesListening = ():ThunkType<ActionType> => async (dispatch) => {
    chatAPI.unSubscribe(newMessageHandler(dispatch))
    chatAPI.stop()
}
export const sendMessageTh = (message:string):ThunkType<ActionType> => async (dispatch) => {
    chatAPI.sendMessage(message)
}




export default chatReduser



