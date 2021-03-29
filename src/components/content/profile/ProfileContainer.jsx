import React from "react";
import Profile from "./Profile";
import s from "./profile.module.css";
import { connect } from "react-redux";
import { getUserProfile,getStatus,updateStatus } from '../../../redux/Profile_Page_Reducer'
import { withRouter } from "react-router-dom";
import { compose } from "redux";


class ProfileConteiner extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        this.props.history.push('/Login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  
  }

  render() {
    return (
      <div className={s.profile}>
        <Profile {...this.props} profile={this.props.profile} updateStatus={this.props.updateStatus} status={this.props.status} />
      </div>
    )
  }

};



const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId:state.auth.userId,
    isAuth:state.auth.isAuth
  }
}

export default compose(
  connect(mapStateToProps,{getUserProfile,getStatus,updateStatus}),
  withRouter,
)(ProfileConteiner)

