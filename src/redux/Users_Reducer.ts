import {Dispatch } from 'redux'
import { usersAPI } from '../api/users_api'
import {updateObjectInArray} from '../components/utils/object_helpers'
import { UserType } from '../types/types'
import { InferActionsType,ThunkType } from './Redux_store'





const FOLLOW = 'FOLLOW'
const UN_FOLLOW = 'UN_FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'





let initionalUserPage = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []as Array<number>,

}
type ActionType = InferActionsType<typeof actions>
export type InitialStateType = typeof initionalUserPage


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
      return { ...state, users: action.users}
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



export const actions = {
   unFollowAccess: (userId:number) => ({ type: UN_FOLLOW, userId } as const ),
   setUsers: (users:Array<UserType>) => ({ type: SET_USERS, users } as const ),
   setCurrentPage: (currentPage: number)=> ({ type: SET_CURRENT_PAGE, currentPage } as const ),
   setTotalUsersCount: (totalUsersCount: number) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount } as const ),
   toggleIsFetching: (isFetching: boolean)=> ({ type: TOGGLE_IS_FETCHING, isFetching } as const ),
   toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: TOGGLE_FOLLOWING_PROGRESS, isFetching, userId } as const ),
  followAccess: (userId: number) => ({ type: FOLLOW, userId } as const )
}





type FollowUnFollowType = (userId:number)=>ActionType

const followUnfollowFloe = async(dispatch: DispatchType,userID: number,methodAPI:any,actionCreator: FollowUnFollowType)=> {
  dispatch(actions.toggleFollowingProgress(true, userID))
  const response = await methodAPI;
  if (response === 0) {
    dispatch(actionCreator(userID))
  }
  dispatch(actions.toggleFollowingProgress(false, userID))
}

// type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionType>
// export const getUsers = (currentPage:number, pageSize:number) =>
// async (dispatch: Dispatch<ActionType>, getState: () => AppStateType) => option for type thunkCreator(dispatch and getState)



export const getUsers = (currentPage: number,pageSize: number):ThunkType<ActionType>  => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true))
  const data = await usersAPI.getUsersAPI(currentPage, pageSize)
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setCurrentPage(currentPage))
}




export const unFollow = (userID: number):ThunkType<ActionType>  => {
  return async (dispatch) => {
    followUnfollowFloe(dispatch, userID, usersAPI.unFollowAPI(userID), actions.unFollowAccess)
  }
}

export const follow = (userID: number):ThunkType<ActionType>  => {
  return async (dispatch) => {
    followUnfollowFloe(dispatch, userID, usersAPI.followAPI(userID), actions.followAccess)
  }
}




export default user_page_reduser