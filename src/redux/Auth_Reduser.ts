import { authAPI,securityAPI } from '../api/api'
import { stopSubmit } from 'redux-form'





const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'


export type initialStateType = {
    login: string|null
    userId: number|null
    email: string|null
    isAuth: boolean
    captchaUrl:string|null
}

const initialState: initialStateType = {
    login: null,
    userId: null,
    email: null,
    isAuth: false,
    captchaUrl:null
}

// export type initialStateType = typeof initialState   иницилизация стейта по умолчанию


const authReduser = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA:

            return {
                ...state,
                ...action.payload
            }
        case SET_CAPTCHA_URL:

            return {
                ...state,
                captchaUrl:action.url
            }

        default:
            return state
    }


}

type setAuthUserDataActionPayloadType = {
    userId: number|null
    login: string|null
    email: string|null
    isAuth: boolean
}
type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number|null, login: string|null, email: string|null, isAuth: boolean): setAuthUserDataActionType =>
    ({ type: SET_USER_DATA, payload: { userId, login, email, isAuth } });


type setCaptchaUrlActionType = {
    type: typeof SET_CAPTCHA_URL
    url: string
}
export const setCaptchaUrl = (url:string): setCaptchaUrlActionType => ({ type: SET_CAPTCHA_URL, url});

export const setAuthUser = () => async (dispatch:any) => {
    const response =  await authAPI.me()
            if (response.data.resultCode === 0) {
                let { id, login, email, } = response.data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
}

export const login = (email:string, password:string, rememberMe:boolean,captcha:string) =>async (dispatch:any) => {
    const response = await authAPI.login(email, password, rememberMe,captcha )
            if (response.data.resultCode === 0) {
                dispatch(setAuthUser())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaUrl())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
                // const action = stopSubmit('login',{_error:'wrong email'})
                // dispatch(action)
                dispatch(stopSubmit('login', { _error: message }))
            }
}
export const getCaptchaUrl = () =>async (dispatch:any) => {
    const response = await securityAPI.getCaptchaUrl()          
                dispatch(setCaptchaUrl(response.data.url))
}
export const logout = () =>async (dispatch:any) => {
    const response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}



export default authReduser



