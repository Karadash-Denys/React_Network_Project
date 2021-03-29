import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './Profile/ProfileInfo'
import s from "./profile.module.css";





const Profile = props => {
   

    
    
    return (
        <div className={s.profileBlock} >
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
           <MyPostsContainer />
        </div>
    )
}





export default Profile