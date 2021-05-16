import React from "react";
import Profile from "./Profile";
import s from "./profile.module.css";
import { connect } from "react-redux";
import { getUserProfile,getStatus,updateStatus,savePhoto,saveProfile } from '../../../redux/Profile_Page_Reducer'
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { AppStateType } from "../../../redux/Redux_store";
import { ProfileType } from "../../../types/types";


type MapStateType = {
    profile: ProfileType | null
    status: string 
    authorizedUserId: number | null
}
type DispatchPropsType = {
  getUserProfile:(id:number)=>void
  getStatus:(id:number)=>void
  updateStatus:(text:string)=>void
  savePhoto:(file: File)=>void
  saveProfile:(data: ProfileType)=>Promise<any>
}

type PathParamsType = {
  userId:string
}
type AllProps = MapStateType & DispatchPropsType & RouteComponentProps<PathParamsType >

class ProfileConteiner extends React.Component <AllProps>{

  refreshProfile = () => {
    let userId: number | null  = +this.props.match.params.userId
    if (!userId) {
      userId= this.props.authorizedUserId
      if (!userId) {
        // userId=14873
        this.props.history.push('/Login')
      }
    }
    this.props.getUserProfile(userId as number )
    this.props.getStatus(userId as number )
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: AllProps, prevState: AllProps) {
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



const mapStateToProps = (state:AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId:state.auth.userId,
  }
}

export default compose<React.ComponentType>(
  connect(mapStateToProps,{getUserProfile,getStatus,updateStatus,savePhoto,saveProfile}),
  withRouter,
)(ProfileConteiner)

