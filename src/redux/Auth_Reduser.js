import { authAPI } from '../api/api'
import { stopSubmit } from 'redux-form'





const SET_USER_DATA = 'SET_USER_DATA'




const initialState = {
    login: null,
    userId: null,
    email: null,
    isAuth: false,
}



const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload
            }

        default:
            return state
    }


}



export const setAuthUserData = (userId, login, email, isAuth) => ({ type: SET_USER_DATA, payload: { userId, login, email, isAuth } });

export const setAuthUser = () => (dispatch) => {
    return authAPI.me()
        .then((response) => {
            if (response.data.resultCode === 0) {
                let { id, login, email, } = response.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
        });

}

export const login = (email, password, rememberMe) => dispatch => {
    authAPI.login(email, password, rememberMe)
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUser())
            } else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                // const action = stopSubmit('login',{_error:'wrong email'})
                // dispatch(action)
                dispatch(stopSubmit('login', { _error: message }))
            }
        });
}
export const logout = () => dispatch => {
    authAPI.logout()
        .then((response) => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
}



export default authReduser



