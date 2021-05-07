import {createSelector} from 'reselect'
import { AppStateType } from './Redux_store'

export const getUsersObj = (state: AppStateType) => {
    return state.usersPage.users
}

export const getUsersObjSuperSelector = createSelector(getUsersObj,(users) => {
    return users.filter(e=>true)
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}