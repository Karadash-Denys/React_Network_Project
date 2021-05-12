import { ApiPhotosType,ApiResponseType, instance} from "./api"
import {  ProfileType } from "../types/types"



export const profileAPI = {
    getUserProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<ApiResponseType>(`profile/status`,{status})
    },
    setPhoto(filePhoto:File) {
        const formData = new FormData();
        formData.append('image',filePhoto)
        return instance.put<ApiResponseType<ApiPhotosType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type':'multipart/formData'
            }
        }).then(res=>res.data)
    },
    setProfile(profile: ProfileType) {
        return instance.put<ApiResponseType>(`profile`,profile)
    }
}