
import { setAuthUser } from './Auth_Reduser'
import { InferActionsType,ThunkType } from './Redux_store'





const SET_INITIALAIZED = 'SET_INITIALAIZED'




const initialState = {
    initialaized: false
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsType< typeof actions>


const appReduser = (state = initialState, action:ActionsType):InitialStateType => {
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


export const actions = {
    initialaizedSuccess: () => ({ type: SET_INITIALAIZED } as const)
}





export const initialaizeApp = ():ThunkType<ActionsType,void> => (dispatch,getState) => {
    const promise = dispatch(setAuthUser())
    Promise.all([promise])
        .then(() => {
        dispatch(actions.initialaizedSuccess())
    }) 
}



export default appReduser



