import React from "react";
import s from "./main-friends-ava.module.css";

const MainFriendsAva = (props) => {
  return (
    <div className={s.ava}>
      <img
        className={s.picture}
        src={props.src}
        alt="ava"
      />
      <p>{props.name}</p>
    </div>
  );
};

export default MainFriendsAva;
