import { usersAPI } from '../api/api'
import {updateObjectInArray} from '../components/utils/object_helpers'





const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN_FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'





let initionalUserPage = {
  users: [],
  pageSize: 20,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],

}


const user_page_reduser = (state = initionalUserPage, action) => {

  switch (action.type) {

    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: true })
        }
      
    case UN_FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', { followed: false})
      }
    case SET_USERS:
      return { ...state, users: action.users }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage }
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.totalUsersCount }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching }
    case TOGGLE_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      }

    default:
      return state
  }
}


export const followAccess = (userId) => ({ type: FOLLOW, userId })
export const unFollowAccess = (userId) => ({ type: UN_FOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId })


const followUnfollowFloe = async(dispatch,userID,methodAPI,actionCreator) => {
  dispatch(toggleFollowingProgress(true, userID))
  const response = await methodAPI;
  if (response === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(toggleFollowingProgress(false, userID))
}

export const getUsers = (currentPage, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  const data = await usersAPI.getUsersAPI(currentPage, pageSize)
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(toggleIsFetching(false))
  dispatch(setCurrentPage(currentPage))
}




export const unFollow = (userID) => {
  return async (dispatch) => {
    followUnfollowFloe(dispatch, userID, usersAPI.unFollowAPI(userID), unFollowAccess)
  }
}

export const follow = (userID) => {
  return async (dispatch) => {
    followUnfollowFloe(dispatch, userID, usersAPI.followAPI(userID), followAccess)
  }
}




export default user_page_reduser