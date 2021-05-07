import React from "react";
import style from "./main-posts-pic.module.css";
import AllComents from './main_post_allComents'











const MainPostsPic = (props) => {

  let newCommentText = props.newPostText


  let add_Post = () => {
    props.addPost()
  };


  const text_area_onChange = (e) => {
    let text = e.target.value
    props.textAreaOnChange(text)
  }

 
  const showComments = props.comment.map(elem => <AllComents key={elem.id} comment={elem.commmentNew} />)



  return (
    <div className={style.pic}>
      <div className={style.container}>
        <div className={style.ava}>
          <img className={style.img} src={props.avaSrc} alt="ava" />
          <p>{props.name}</p>
        </div>
        <div className={style.photo}>
          <img src={props.photoSrc} alt="pict" />
        </div>
        <div className={style.comment}>
          {showComments}

        </div>
        <div className={style.newComment}>
          <textarea
            placeholder="New Comment"
            cols="163"
            rows="5"
            value={newCommentText}
            onChange={text_area_onChange}
          ></textarea>
        </div>
        <div>
          <button onClick={add_Post}>Add post</button>
        </div>
      </div>
    </div>
  );
};

export default MainPostsPic;
