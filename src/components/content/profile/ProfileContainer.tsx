import React, { useEffect } from "react"
import Profile from "./Profile"
import s from "./profile.module.css"
import { useDispatch, useSelector } from "react-redux"
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../../redux/Profile_Page_Reducer"
import { useParams } from "react-router-dom"
import { AppStateType } from "../../../redux/Redux_store"
import { ProfileType } from "../../../types/types"

const ProfilePage: React.FC = () => {
    const profile = useSelector(
        (state: AppStateType) => state.profilePage.profile
    )
    const status = useSelector(
        (state: AppStateType) => state.profilePage.status
    )
    const authorizedUserId = useSelector(
        (state: AppStateType) => state.auth.userId
    )

    const dispatch = useDispatch()
    let params: { userId: string } = useParams()

    const updateStatuss = (text: string) => {
        dispatch(updateStatus(text))
    }
    const savePhotoo = (file: File) => {
        dispatch(savePhoto(file))
    }
    const saveProfilee = async(formData:ProfileType) => {
        await dispatch(saveProfile(formData))
    }
    let userId: number | null = +params.userId
    const refreshProfile = () => {
        if (!userId) {
            userId = authorizedUserId
        }
        dispatch(getUserProfile(userId as number))
        dispatch(getStatus(userId as number))
    }

    useEffect(() => {
        refreshProfile()
    }, [userId])
    

    return (
        <div className={s.profile}>
            <Profile
                isOwner={!userId}
                profile={profile}
                updateStatus={updateStatuss}
                savePhoto={savePhotoo}
                status={status}
                saveProfile={saveProfilee}
            />
        </div>
    )
}

export default ProfilePage
