import React from "react";
import Preloader from "../../../../common/preloader/Preloader";
import s from "../profile.module.css";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = (props) => {
 

    if (!props.profile) return <Preloader />;
    
  return (
    <div className={s.img_block}>
      <div>
        <img
          src="https://saletur.ru/galery/tfoto/big/043/73/437321.jpg"
          alt=""
          className={s.img}
        />
      </div>
      <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} /> 
          <div className={s.userProfile} >
              <div> <img src={props.profile.photos.large} alt='photos' /> </div>
              <div>
                  <p>{props.profile.fullName}</p>
                  <p>{props.profile.aboutMe}</p>
                  <p>{props.profile.lookingForAJobDescription }</p>
              </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
