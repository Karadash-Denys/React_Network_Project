import React, { ChangeEvent, useState } from "react";
import Preloader from "../../../../common/preloader/Preloader";
import s from "../profile.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userAva from "../../../../assets/imeges/users.png";
import ProfileDataFormReduxForm from './ProfileFormData'
import { ContactsType, ProfileType } from "../../../../types/types";


type PropsType = {
  profile: ProfileType | null
  status: string 
  isOwner: boolean
  updateStatus:(status:string)=>void
  savePhoto:(file: File) =>void
  saveProfile: (data:ProfileType)=>Promise<any>
}

const ProfileInfo:React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto,saveProfile }) => {
  const [editMode, setEditMode] = useState(false);
  if (!profile) return <Preloader />;

  const onMainFileSelected = (e:ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {  // add e.target.files && e.target.files?.length
      savePhoto(e.target.files[0]);
    }
  };
  const onSubmitLogin =  (formData:ProfileType) => {
     saveProfile(formData).then(()=>setEditMode(false))
    };

  return (
    <div className={s.img_block}>
      <div>
        <img
          src="https://saletur.ru/galery/tfoto/big/043/73/437321.jpg"
          alt=""
          className={s.img}
        />
      </div>
    
      <div className={s.userProfile}>
      <div>
        {" "}
        <img
          src={profile.photos.large || userAva}
          alt="photos"
          className={s.userAva}
        />{" "}
        </div>
        <ProfileStatusWithHooks  status={status} updateStatus={updateStatus} />
        <div>
        {isOwner && <input type="file" onChange={onMainFileSelected} />}
        </div>
        {editMode ? (
          <ProfileDataFormReduxForm initialValues={profile} profile={profile} status={status} onSubmit={onSubmitLogin} />
        ) : (
          <ProfileData isOwner={isOwner} profile={profile} goToEditMode={()=>{setEditMode(true)}} />
        )}
      </div>
    </div>
  );
};

type ProfileDataType = {
  profile: ProfileType 
  isOwner: boolean
  goToEditMode:()=>void
}

const ProfileData:React.FC <ProfileDataType> = ({ profile, isOwner,goToEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={goToEditMode} >EDIT</button>
        </div>
      )}
      <div>
        <p>{profile.fullName}</p>
        <p>
          <b> Status: </b>
          {profile.status}
        </p>
        <p>
          <b> About me: </b>
          {profile.aboutMe}
        </p>
        <p>
          <b> My rofessional skills: </b> {profile.lookingForAJobDescription}
        </p>
        <p>
          <b> Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
        </p>
        <div>
          <b>Contacts</b>:
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contacts
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key as keyof ContactsType]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};


type ProfileContactsType = {
  contactTitle: string | null
  contactValue: string | null
}

const Contacts:React.FC<ProfileContactsType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b className={s.contact}>{contactTitle}</b> : {contactValue}
    </div>
  );
};

export default ProfileInfo;
