import { profileAPI } from '../api/api'
import { stopSubmit } from 'redux-form'







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
    ],
    profile: null,
    status:''
}



const profileReduser = (state = initialState, action) => {
    
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
                profile: {...state.profile,photos:action.img}
            }
        
        default:
            return state
    }
            
   
}



export const addPost =(body)=>({type:ADD_POST,body})
export const setUserProfileNew = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_STATUS, status });
export const setPhotoSucces = (img) => ({ type: SAVE_PHOTO_SUCCESS, img });

export const getUserProfile = (userId) => async dispatch => {
    try {
        const response = await profileAPI.getUserProfile(userId)
        dispatch(setUserProfileNew(response.data));
    } catch(error) {
      console.log(error.message);
    }
}
    
export const getStatus = (userId) => async(dispatch) => {
    const data = await profileAPI.getStatus(userId)
        dispatch(setUserStatus(data))
}

export const updateStatus = (status) =>async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(JSON.parse(response.config.data).status))
            }
}
export const savePhoto = (file) =>async (dispatch) => {
    const response = await profileAPI.setPhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(setPhotoSucces(response.data.data.photos))
            }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
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



