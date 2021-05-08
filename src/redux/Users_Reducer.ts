import {Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { usersAPI } from '../api/api'
import {updateObjectInArray} from '../components/utils/object_helpers'
import { UserType } from '../types/types'
import { AppStateType } from './Redux_store'





const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN_FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'



type InitialStateType = typeof initionalUserPage

let initionalUserPage = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []as Array<number>,

}


const user_page_reduser = (state = initionalUserPage, action: ActionType): InitialStateType => {

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

type FollowAccessActionType = {
  type: typeof FOLLOW
  userId: number
}
type UnFollowAccessActionType = {
  type: typeof UN_FOLLOW
  userId: number
}
type SetUsersActionType = {
  type: typeof SET_USERS
  users: Array <UserType>
}
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalUsersCount: number
}
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}

export const followAccess = (userId:number): FollowAccessActionType => ({ type: FOLLOW, userId })
export const unFollowAccess = (userId:number): UnFollowAccessActionType => ({ type: UN_FOLLOW, userId })
export const setUsers = (users:Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId })

type ActionType = FollowAccessActionType | UnFollowAccessActionType | SetUsersActionType | SetCurrentPageActionType |
  SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowUnFollowType = (userId:number)=>FollowAccessActionType | UnFollowAccessActionType

const followUnfollowFloe = async(dispatch: DispatchType,userID: number,methodAPI:any,actionCreator: FollowUnFollowType)=> {
  dispatch(toggleFollowingProgress(true, userID))
  const response = await methodAPI;
  if (response === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(toggleFollowingProgress(false, userID))
}

// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionType>
// export const getUsers = (currentPage:number, pageSize:number) =>
// async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => option for type thunkCreator(dispatch and getState)

type ThunkType = ThunkAction< Promise<void>, AppStateType, unknown, ActionType>

export const getUsers = (currentPage: number,pageSize: number):ThunkType  => async (dispatch, getState) => {
  dispatch(toggleIsFetching(true))
  const data = await usersAPI.getUsersAPI(currentPage, pageSize)
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
  dispatch(toggleIsFetching(false))
  dispatch(setCurrentPage(currentPage))
}




export const unFollow = (userID: number):ThunkType  => {
  return async (dispatch) => {
    followUnfollowFloe(dispatch, userID, usersAPI.unFollowAPI(userID), unFollowAccess)
  }
}

export const follow = (userID: number):ThunkType  => {
  return async (dispatch) => {
    followUnfollowFloe(dispatch, userID, usersAPI.followAPI(userID), followAccess)
  }
}




export default user_page_reduser