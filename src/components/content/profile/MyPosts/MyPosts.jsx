import React from "react";
import Posts from "./Posts.jsx";
import s from "../profile.module.css";
import AddNewPostsFormRedux from './Posts_Form'


const MyPosts = (props) => {


  const onClickPost = (formData) => {
    props.addPost(formData.newPostText);
    };
    
    const postBlock=props.posts.map(elem=><Posts key={elem.id} message={elem.message} likesCount={elem.likesCount} />)

  return (
    <div>
      <h3>My Posts</h3>
      <AddNewPostsFormRedux onSubmit={onClickPost} />
          {postBlock}
    </div>
  );
};

export default MyPosts;
