import  axios from "axios";
import { ProfileType } from "../types/types";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '240165ce-4380-41b3-ba47-89468cbbbd64'
    }
})





export const usersAPI = {
    getUsersAPI(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followAPI(id: number) {
        return instance.post(`follow/${id}`).then(res=>res.data.resultCode)

    },
    unFollowAPI(id: number) {
        return instance.delete(`follow/${id}`).then(res=>res.data.resultCode)

    }
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`,{status})
    },
    setPhoto(filePhoto:any) {
        const formData = new FormData();
        formData.append('image',filePhoto)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type':'multipart/formData'
            }
        })
    },
    setProfile(profile: ProfileType) {
        return instance.put(`profile`,profile)
    }
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode:ResulCodesEnum
    messages: Array<string>
}
type loginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResulCodesForCaptchaEnum | ResulCodesEnum
    messages: Array<string>
}

export enum ResulCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResulCodesForCaptchaEnum {
    CaptshaIsRequaired = 10
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res=>res.data)
    },
    login(email: string,password: string,rememberMe=false,captcha:string | null  = null) {
        return instance.post<loginResponseType>(`auth/login`,{email,password,rememberMe,captcha}).then(res=>res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}













































