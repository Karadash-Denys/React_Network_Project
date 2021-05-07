import React from "react"
import { connect } from "react-redux"
import {
  follow,
  unFollow,
  getUsers,
} from "../../../redux/Users_Reducer"
import Users from "./Users"
import Preloader from "../../../common/preloader/Preloader"
import { compose } from "redux";
import {getUsersObjSuperSelector,getPageSize,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress} from '../../../redux/Users_Selector'
import { UserType } from "../../../types/types"
import { AppStateType } from "../../../redux/Redux_store"


type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  totalUsersCount: number
  users: Array<UserType>
  followingInProgress: Array<number>

}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  unFollow: (userId:number) => void
  follow: (userId:number) => void
}
type OwnPropsType = {
  pageTitle: string
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersClassComponent extends React.Component <PropsType> {
  componentDidMount() {
    const {currentPage,pageSize} =this.props
    this.props.getUsers(currentPage,pageSize)
  }

  onPageChanged = (pageNumber:number) => {
    const {pageSize} =this.props
    this.props.getUsers(pageNumber,pageSize)
  };

  render() {
    return (
      <>
        <h3>{this.props.pageTitle}</h3>
        {this.props.isFetching ? <Preloader /> : null}

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
      </>
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
  };
};

export default compose(
  connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps, {follow,unFollow,getUsers,}),
)(UsersClassComponent)

