import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unFollow,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
  getUsers,
} from "../../../redux/Users_Reducer";
import Users from "./Users";
import Preloader from "../../../common/preloader/Preloader";
import { compose } from "redux";
import {getUsersObjSuperSelector,getPageSize,getTotalUsersCount,getCurrentPage,getIsFetching,getFollowingInProgress} from '../../../redux/Users_Selector'

class UsersClassComponent extends React.Component {
  componentDidMount() {
    const {currentPage,pageSize} =this.props
    this.props.getUsers(currentPage,pageSize)
  }

  onPageChanged = (pageNumber) => {
    const {pageSize} =this.props
    this.props.getUsers(pageNumber,pageSize)
  };

  render() {
    return (
      <>
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



const mapStateToProps = (state) => {
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
  connect(mapStateToProps, {
    follow,
    unFollow,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    getUsers,
  }),
)(UsersClassComponent)

