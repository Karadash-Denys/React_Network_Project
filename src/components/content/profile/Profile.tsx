import React from 'react'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import ProfileInfo from './Profile/ProfileInfo'
import s from "./profile.module.css";
import { ProfileType } from '../../../types/types';


type PropsType = {
    updateStatus:(text:string)=>void
    savePhoto:(file: File)=>void
    saveProfile: (data: ProfileType) => Promise<any>
    isOwner: boolean
    profile: ProfileType | null
    status: string
}


const Profile:React.FC<PropsType> = props => {
   

    
    
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