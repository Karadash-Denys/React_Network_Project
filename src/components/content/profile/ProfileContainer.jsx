import React from "react";
import Profile from "./Profile";
import s from "./profile.module.css";
import { connect } from "react-redux";
import { getUserProfile,getStatus,updateStatus,savePhoto,saveProfile } from '../../../redux/Profile_Page_Reducer'
import { withRouter } from "react-router-dom";
import { compose } from "redux";


class ProfileConteiner extends React.Component {

  refreshProfile = () => {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
      if (!userId) {
        userId=14873
        // this.props.history.push('/Login')
      }
    }
    this.props.getUserProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  };

  render() {
    return (
      <div className={s.profile}>
        <Profile
          {...this.props}
          isOwner ={!this.props.match.params.userId}
          profile={this.props.profile}
          updateStatus={this.props.updateStatus}
          status={this.props.status}
        />
      </div>
    )
  }

};



const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId:state.auth.userId,
  }
}

export default compose(
  connect(mapStateToProps,{getUserProfile,getStatus,updateStatus,savePhoto,saveProfile}),
  withRouter,
)(ProfileConteiner)

