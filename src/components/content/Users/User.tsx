import React from "react";
import s from "./user.module.css";
import userPhoto from "../../../assets/imeges/users.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../types/types";
import { Button, Card } from 'antd';
import "antd/dist/antd.css"


type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  unFollow: (id: number) => void
  follow:(id:number) => void
}


const User: React.FC<PropsType> = ({ user, followingInProgress, unFollow, follow }) => {
  
 

const { Meta } = Card;

  return (
    <>
    <Card
    hoverable
    style={{ width: 200,margin: 20 }}
        cover={<NavLink to={'/Profile/' + user.id}>
          <img style={{ width: 200 }} alt="example" src={user.photos.small != null ? user.photos.small : userPhoto} />
          </NavLink>}
  >
        <Meta title={user.name} description={user.status} />
        {user.followed ? (
                  <Button style={{margin: 5 }} type="primary"
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => { unFollow(user.id)}}>
                    Unfollow
                  </Button>
                ) : (
                    <Button style={{ margin: 5 }} type="primary"
                      disabled={followingInProgress.some(id => id === user.id)}
                      onClick={() => { follow(user.id)}}>
                    Follow
                  </Button>
                )}
      </Card>
    </>
  )
    //       <div  className={s.user}>
    //         <span>
    //           <div>
    //             <NavLink to={'/Profile/' +user.id }>
    //             <img
    //                 className={s.usersPhoto}
    //                 alt='yo'
    //               src={user.photos.small != null ? user.photos.small : userPhoto}
    //               />
    //               </NavLink>
    //           </div>
    //           <div>
                // {user.followed ? (
                //   <button
                //     disabled={followingInProgress.some(id => id === user.id)}
                //     onClick={() => { unFollow(user.id)}}>
                //     Unfollow
                //   </button>
                // ) : (
                //     <button
                //       disabled={followingInProgress.some(id => id === user.id)}
                //       onClick={() => { follow(user.id)}}>
                //     Follow
                //   </button>
                // )}
    //           </div>
    //         </span>
    //         <span>
    //           <span>
    //             <div>{user.name}</div>
    //             <div>{user.status}</div>
    //           </span>
    //           <span>
    //             <div>{"u.sity"}</div>
    //             <div>{"u.country"}</div>
    //           </span>
    //         </span>
    //       </div>
    // )
}





export default User





































