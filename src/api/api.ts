import  axios from "axios";
import { PhotosType, UserType } from "../types/types";



 export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '240165ce-4380-41b3-ba47-89468cbbbd64'
    }
})


export enum ResulCodesEnum {
    Success = 0,
    Error = 1
}
export enum ResulCodesForCaptchaEnum {
    CaptshaIsRequaired = 10
}
export type ApiPhotosType = {
    photos: PhotosType
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type ApiResponseType <D = {},RC = ResulCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
    fieldsErrors?:Array<any>
}












































