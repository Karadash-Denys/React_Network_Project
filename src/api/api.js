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
        return instance.put(`/profile/status`,{status})
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email,password,rememberMe=false) {
        return instance.post(`auth/login`,{email,password,rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    }
}













































