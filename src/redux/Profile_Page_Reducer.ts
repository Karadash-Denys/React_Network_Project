import { profileAPI } from '../api/api'
import { stopSubmit } from 'redux-form'
import { PostsType,ProfileType,PhotosType } from '../types/types'







const ADD_POST ='profile/ADD_POST'
const SET_USER_PROFILE ='profile/SET_USER_PROFILE'
const SET_STATUS ='profile/SET_STATUS'
const SAVE_PHOTO_SUCCESS ='profile/SAVE_PHOTO_SUCCESS'



const initialState = {
    posts: [
        {id:1,message:'How are you',likesCount:10},
        {id:2,message:'Good',likesCount:5},
        {id:3,message:'Feel life',likesCount:8},
        {id:4,message:'Just do it',likesCount:7},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status:'' 
}

export type InitialStateType = typeof initialState

const profileReduser = (state = initialState, action:any):InitialStateType => {
    
    switch (action.type) {
        case ADD_POST:
            return  {
                ...state,
                posts: [...state.posts, { id: 5, message: action.body, likesCount: 8 }],
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile,photos:action.img} as ProfileType
            }
        
        default:
            return state
    }
            
   
}


type AddPostActionType = {
    type: typeof ADD_POST,
    body:string
}
type SetUserProfileNewActionType = {
    type: typeof SET_USER_PROFILE,
    profile:ProfileType
}
type SetUserStatusActionType = {
    type: typeof SET_STATUS,
    status:string
}
type SetPhotoSuccesActionType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    img: PhotosType
}
export const addPost =(body:string): AddPostActionType =>({type:ADD_POST,body})
export const setUserProfileNew = (profile:ProfileType): SetUserProfileNewActionType => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status:string): SetUserStatusActionType => ({ type: SET_STATUS, status });
export const setPhotoSucces = (img:PhotosType): SetPhotoSuccesActionType => ({ type: SAVE_PHOTO_SUCCESS, img });

export const getUserProfile = (userId: number) => async (dispatch: any) => {
    try {
        const response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileNew(response.data));
    } catch(error) {
      console.log(error.message);
    }
}
    
export const getStatus = (userId: number) => async(dispatch: any) => {
    const data = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data))
}

export const updateStatus = (status: string) =>async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(JSON.parse(response.config.data).status))
            }
}
export const savePhoto = (file:any) =>async (dispatch: any) => {
    const response = await profileAPI.setPhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(setPhotoSucces(response.data.data.photos))
            }
}
export const saveProfile = (profile:ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await profileAPI.setProfile(profile)
            if (response.data.resultCode === 0) {
                dispatch(getUserProfile(userId))
            } else {
                dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }))
                return Promise.reject(response.data.messages[0] )
            }
}


export default profileReduser



