import React from 'react'
import s from "../profile.module.css";




const Posts = props => {
    // console.log(props);



    return (
        <div className={s.postBlock} >
            <div>
                <img  src='https://i.pinimg.com/originals/0c/a9/e2/0ca9e28dcb12dc698cfd2beda6d6fa64.jpg' alt=''className={s.imgPost} />
            </div>
            <p>{props.message}</p>
            <p>{props.likesCount} </p>
        </div>
    )
}





export default Posts