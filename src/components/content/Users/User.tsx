import React from "react";
import s from "./user.module.css";
import userPhoto from "../../../assets/imeges/users.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../../types/types";


type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  unFollow: (id: number) => void
  follow:(id:number) => void
}


const User:React.FC<PropsType> = ({user,followingInProgress,unFollow,follow}) => {

    return (
          <div  className={s.user}>
            <span>
              <div>
                <NavLink to={'/Profile/' +user.id }>
                <img
                    className={s.usersPhoto}
                    alt='yo'
                  src={user.photos.small != null ? user.photos.small : userPhoto}
                  />
                  </NavLink>
              </div>
              <div>
                {user.followed ? (
                  <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => { unFollow(user.id)}}>
                    Unfollow
                  </button>
                ) : (
                    <button
                      disabled={followingInProgress.some(id => id === user.id)}
                      onClick={() => { follow(user.id)}}>
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </span>
              <span>
                <div>{"u.sity"}</div>
                <div>{"u.country"}</div>
              </span>
            </span>
          </div>
    )
}





export default User





































