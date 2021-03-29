import { profileAPI } from '../api/api'







const ADD_POST ='ADD_POST'
const SET_USER_PROFILE ='SET_USER_PROFILE'
const SET_STATUS ='SET_STATUS'



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
        
        default:
            return state
    }
            
   
}



export const addPost =(body)=>({type:ADD_POST,body})
export const setUserProfileNew = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setUserStatus = (status) => ({ type: SET_STATUS, status });

export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userId).then((response) => {
            dispatch(setUserProfileNew(response.data));
          });
    }
}
export const getStatus = (userId) => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(data =>dispatch(setUserStatus(data)))
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(JSON.parse(response.config.data).status))
            }
        })
}


export default profileReduser



