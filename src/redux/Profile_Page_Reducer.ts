
import { stopSubmit } from 'redux-form'
import { ResulCodesEnum } from '../api/api'
import { profileAPI } from '../api/profile_api'
import { PostsType, ProfileType, PhotosType } from '../types/types'
import { InferActionsType, ThunkType } from './Redux_store'







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
type ActionsType = InferActionsType<typeof actions>

const profileReduser = (state = initialState, action:ActionsType):InitialStateType => {
    
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


export const actions = {
    addPost: (body: string) => ({ type: ADD_POST, body }as const),
    setUserProfileNew: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setUserStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    setPhotoSucces: (img:PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, img } as const)
}



export const getUserProfile = (userId: number): ThunkType<ActionsType> => async (dispatch) => {
    try {
        const response = await profileAPI.getUserProfile(userId)
        dispatch(actions.setUserProfileNew(response.data));
    } catch(error) {
      console.log(error.message);
    }
}
    
export const getStatus = (userId: number ):ThunkType<ActionsType> => async(dispatch) => {
    const data = await profileAPI.getStatus(userId)
        dispatch(actions.setUserStatus(data))
}

export const updateStatus = (status: string):ThunkType<ActionsType> =>async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(actions.setUserStatus(JSON.parse(response.config.data).status))
            }
}
export const savePhoto = (file:File):ThunkType<ActionsType> =>async (dispatch) => {
    const response = await profileAPI.setPhoto(file)
            if (response.resultCode === ResulCodesEnum.Success) {
                dispatch(actions.setPhotoSucces(response.data.photos))
            }
}
export const saveProfile = (profile:ProfileType):ThunkType<ActionsType | ReturnType<typeof stopSubmit> > => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const response = await profileAPI.setProfile(profile)
    if (response.data.resultCode === 0) {
                if (userId !==null) {
                    dispatch(getUserProfile(userId))
                } else {
                    throw new Error("Yser id Can not be null");
                    
                }
            } else {
                dispatch(stopSubmit('editProfile', { _error: response.data.messages[0] }))
                return Promise.reject(response.data.messages[0] )
            }
}


export default profileReduser



