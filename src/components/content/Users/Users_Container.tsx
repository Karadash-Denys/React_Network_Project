import React from "react"
import { connect } from "react-redux"
import {
  follow,
  unFollow,
  getUsers,
  FilterType,
} from "../../../redux/Users_Reducer"
import Users from "./Users"
import Preloader from "../../../common/preloader/Preloader"
import { compose } from "redux";
import {
  getUsersObjSuperSelector, getPageSize, getTotalUsersCount,
  getCurrentPage, getIsFetching, getFollowingInProgress,getUsersFilter
} from '../../../redux/Users_Selector'
import { UserType } from "../../../types/types"
import { AppStateType } from "../../../redux/Redux_store"
import UsersSearchForm from "./Users_Search_Form"



type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>
  filter: FilterType

}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number,filter:FilterType) => void
  unFollow: (userId:number) => void
  follow: (userId:number) => void
}
type OwnPropsType = {
  pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersClassComponent extends React.Component <PropsType> {
  componentDidMount() {
    const {currentPage,pageSize,filter} =this.props
    this.props.getUsers(currentPage,pageSize,filter)
  }

  onPageChanged = (pageNumber:number) => {
    const {pageSize,filter} =this.props
    this.props.getUsers(pageNumber,pageSize,filter)
  }

  onFilterChanged = (filter: FilterType) => {
    const {pageSize} =this.props
    this.props.getUsers(1,pageSize,filter)
  }

  render() {
    return (
      <div style={{ textAlign: 'center'}} >
        <UsersSearchForm onFilterChanged={this.onFilterChanged} />
        <h3>{this.props.pageTitle}</h3>
        {this.props.isFetching ? <Preloader /> : null}
        <div>
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unFollow={this.props.unFollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
          />
          </div>
      </div>
    );
  }
}





const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsersObjSuperSelector(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  };
};

export default compose(
  connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, {follow,unFollow,getUsers,}),
)(UsersClassComponent)

