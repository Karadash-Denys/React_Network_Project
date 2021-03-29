import React from "react";
import MainFriendsAva from "../main-friends/main-friends-ava";
import s from "./main-friends.module.css";

const MainFriends = (props) => {

  let friendsAva = props.friendsData.map(friend=><MainFriendsAva key={friend.id} name={friend.name} src={friend.src} />)
  return (
    <div className={s.main}>
      {friendsAva}
    </div>
  );
};

export default MainFriends;
