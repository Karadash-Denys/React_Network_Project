import React from "react";
import Posts from "./Posts";
import AddNewPostsFormRedux from './Posts_Form'
import { PostDataType } from "./Posts_Form"
import {PostsType} from '../../../../types/types'


export type MapPropsType = {
  posts: Array<PostsType>
}
export type DispatchPropsType = {
  addPost: (text: string)=>void
}

const MyPosts:React.FC<MapPropsType & DispatchPropsType> = (props) => {
  


  const onClickPost = (formData:PostDataType) => {
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
