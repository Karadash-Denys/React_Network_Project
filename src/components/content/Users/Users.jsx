import React from "react";
import s from "./user.module.css";
import userPhoto from "../../../assets/imeges/users.png";
import { NavLink } from "react-router-dom";





const Users = (props) => {
    

    const pagesCount = Math.ceil( props.totalUsersCount / props.pageSize)
    
    const pages = []
    for (let i = 1; i <= pagesCount; i++){
      pages.push(i)
  }


  



    return (
        <div className={s.users_block}>
        <div>
          {pages.map(p => <span key={p} className={props.currentPage === p ? s.selectedPage:undefined}
          onClick={()=>{props.onPageChanged(p)}}>-{p}</span>)}
        </div>
        {props.users.map((u) => (
          <div key={u.id} className={s.user}>
            <span>
              <div>
                <NavLink to={'/Profile/' +u.id }>
                <img
                    className={s.usersPhoto}
                    alt='yo'
                  src={u.photos.small != null ? u.photos.small : userPhoto}
                  />
                  </NavLink>
              </div>
              <div>
                {u.followed ? (
                  <button
                    disabled={props.followingInProgress.some(id => id === u.id)}
                    onClick={() => { props.unFollow(u.id)}}>
                    Unfollow
                  </button>
                ) : (
                    <button
                      disabled={props.followingInProgress.some(id => id === u.id)}
                      onClick={() => { props.follow(u.id)}}>
                    Follow
                  </button>
                )}
              </div>
            </span>
            <span>
              <span>
                <div>{u.name}</div>
                <div>{u.status}</div>
              </span>
              <span>
                <div>{"u.sity"}</div>
                <div>{"u.country"}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    )
}





export default Users





































