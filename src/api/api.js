import * as axios from "axios";



const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '240165ce-4380-41b3-ba47-89468cbbbd64'
    }
})





export const usersAPI = {
    getUsersAPI(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    followAPI(id) {
        return instance.post(`follow/${id}`).then(res=>res.data.resultCode)

    },
    unFollowAPI(id) {
        return instance.delete(`follow/${id}`).then(res=>res.data.resultCode)

    }
}

export const profileAPI = {
    getUserProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data)
    },
    updateStatus(status) {
        return instance.put(`profile/status`,{status})
    },
    setPhoto(filePhoto) {
        const formData = new FormData();
        formData.append('image',filePhoto)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type':'multipart/formData'
            }
        })
    },
    setProfile(filePhoto) {
        return instance.put(`profile`,filePhoto)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email,password,rememberMe=false,captcha=null) {
        return instance.post(`auth/login`,{email,password,rememberMe,captcha})
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













































