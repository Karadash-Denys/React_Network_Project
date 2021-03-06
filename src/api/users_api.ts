
import { GetItemsType, instance} from "./api"












export const usersAPI = {
    getUsersAPI(currentPage: number, pageSize: number,term:string = '',friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`+ (friend===null?'':`&friend=${friend}`))
            .then(response => response.data)
    },
    followAPI(id: number) {
        return instance.post(`follow/${id}`).then(res=>res.data.resultCode) as Promise<number>

    },
    unFollowAPI(id: number) {
        return instance.delete(`follow/${id}`).then(res=>res.data.resultCode) as Promise<number>

    }
}




