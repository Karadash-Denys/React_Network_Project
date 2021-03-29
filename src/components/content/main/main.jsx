import React from "react";
import s from "./main.module.css";
import MainFriends from "./main-friends/main-friends";
import MainPosts from "./main-posts/main-posts";

const Main = (props) => {

  return (
    
    <div className={s.main}>
      <MainFriends friendsData={props.friendsData} />
     
      <MainPosts
        postsData={props.postsData}
        newPostText={props.newPostText}
        addPost={props.addPost}
        textAreaOnChange={props.textAreaOnChange}
      />
    </div>
  );
};

export default Main;
