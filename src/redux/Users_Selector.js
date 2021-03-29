import {createSelector} from 'reselect'

export const getUsersObj = (state) => {
    return state.usersPage.users
}

export const getUsersObjSuperSelector = createSelector(getUsersObj,(users) => {
    return users.filter(e=>true)
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}