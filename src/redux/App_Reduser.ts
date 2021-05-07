
import { setAuthUser } from './Auth_Reduser'





const SET_INITIALAIZED = 'SET_INITIALAIZED'


export type InitialStateType = {
    initialaized: boolean
}

const initialState: InitialStateType = {
    initialaized: false
}



const appReduser = (state = initialState, action:any):InitialStateType => {
    switch (action.type) {
        case SET_INITIALAIZED:

            return {
                ...state,
                initialaized: true
            }

        default:
            return state
    }


}


type initialaizedSuccessActionType = {
    type: typeof SET_INITIALAIZED //'SET_INITIALAIZED' it means the same
}

export const initialaizedSuccess = ():initialaizedSuccessActionType => ({ type: SET_INITIALAIZED });

export const initialaizeApp = () => (dispatch:any) => {
    const promise = dispatch(setAuthUser())
    Promise.all([promise])
        .then(() => {
        dispatch(initialaizedSuccess())
    }) 
}



export default appReduser



