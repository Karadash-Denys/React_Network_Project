import { ResulCodesEnum,ResulCodesForCaptchaEnum } from '../api/api'
import { stopSubmit } from 'redux-form'
import {  InferActionsType,ThunkType } from './Redux_store'
import { authAPI } from '../api/auth-api'
import { securityAPI } from '../api/security_api'





const SET_USER_DATA = 'auth/SET_USER_DATA'
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL'




const initialState = {
    login: null as string | null,
    userId: null as number | null,
    email: null as string | null,
    isAuth: false,
    captchaUrl:null as string | null 
}


type ActionType = InferActionsType<typeof actions>
export type InitialStateType = typeof initialState



const authReduser = (state = initialState, action: ActionType): InitialStateType => {
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


export const actions = {
    setAuthUserData :(userId: number|null, login: string|null, email: string|null, isAuth: boolean) =>({ type: SET_USER_DATA, payload: { userId, login, email, isAuth } } as const),
    setCaptchaUrl: (url: string) => ({ type: SET_CAPTCHA_URL, url } as const ),
}








export const setAuthUser = ():ThunkType<ActionType> => async (dispatch,getState) => {
    const data =  await authAPI.me()
            if (data.resultCode === ResulCodesEnum.Success) {
                let { id, login, email, } = data.data
                dispatch(actions.setAuthUserData(id, login, email, true))
            }
}

export const login = (email:string, password:string, rememberMe:boolean,captcha:string | null): ThunkType<ActionType | ReturnType<typeof stopSubmit>> =>async (dispatch,getState) => {
    const data = await authAPI.login(email, password, rememberMe,captcha )
            if (data.resultCode === ResulCodesEnum.Success) {
                dispatch(setAuthUser())
            } else {
                if (data.resultCode === ResulCodesForCaptchaEnum.CaptshaIsRequaired) {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                // const action = stopSubmit('login',{_error:'wrong email'})
                // dispatch(action)
                dispatch(stopSubmit('login', { _error: message }))
            }
}
export const getCaptchaUrl = (): ThunkType<ActionType> => async (dispatch,getState) => {
    const response = await securityAPI.getCaptchaUrl()          
                dispatch(actions.setCaptchaUrl(response.data.url))
}
export const logout = (): ThunkType<ActionType> => async (dispatch,getState) => {
    const response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false))
            }
}



export default authReduser



