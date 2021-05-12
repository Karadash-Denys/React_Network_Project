import { instance, ApiResponseType, ResulCodesForCaptchaEnum, ResulCodesEnum } from "./api"




type MeResponseDataType = {
        id: number
        email: string
        login: string   
}
type loginResponseDataType = {
        userId: number
}



export const authAPI = {
    me() {
        return instance.get<ApiResponseType<MeResponseDataType>>(`auth/me`).then(res=>res.data)
    },
    login(email: string,password: string,rememberMe=false,captcha:string | null  = null) {
        return instance.post<ApiResponseType<loginResponseDataType,ResulCodesEnum | ResulCodesForCaptchaEnum>>(`auth/login`,{email,password,rememberMe,captcha}).then(res=>res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}