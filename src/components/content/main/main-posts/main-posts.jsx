import React from "react";
import MainPostsPic from "./main-posts-pic";
import s from "./main-posts.module.css";

const MainPosts = (props) => {


  
  let postElements = props.postsData.map((post) => (
    <MainPostsPic
      name={post.name}
      avaSrc={post.avaSrc}
      photoSrc={post.photoSrc}
      addPost={props.addPost}
      textAreaOnChange={props.textAreaOnChange}
      comment={post.comment}
      newPostText={props.newPostText}
      key={post.id}
    />
  ));
  return <div className={s.posts}>{postElements}</div>;
};

export default MainPosts;
