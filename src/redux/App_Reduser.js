
import { setAuthUser } from './Auth_Reduser'





const SET_INITIALAIZED = 'SET_INITIALAIZED'




const initialState = {
    initialaized: false
}



const appReduser = (state = initialState, action) => {
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



export const initialaizedSuccess = () => ({ type: SET_INITIALAIZED });

export const initialaizeApp = () => dispatch => {
    const promise = dispatch(setAuthUser())
    Promise.all([promise])
        .then(() => {
        dispatch(initialaizedSuccess())
    }) 
}



export default appReduser



