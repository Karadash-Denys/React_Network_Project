import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './Profile/ProfileInfo'
import s from "./profile.module.css";





const Profile = props => {
   

    
    
    return (
        <div className={s.profileBlock} >
            <ProfileInfo
                savePhoto={props.savePhoto}
                saveProfile={props.saveProfile}
                profile={props.profile}
                status={props.status}
                isOwner={props.isOwner}
                updateStatus={props.updateStatus}
            />
           <MyPostsContainer />
        </div>
    )
}





export default Profile