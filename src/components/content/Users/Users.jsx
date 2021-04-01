import React from "react";
import s from "./user.module.css";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User";





const Users = ({totalUsersCount,pageSize,users,followingInProgress,unFollow,follow,onPageChanged,currentPage}) => {

    return (
      <div className={s.users_block}>
        <Paginator
          currentPage={currentPage}
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          onPageChanged={onPageChanged}
        />
       
        {users.map(u => <User
          key={u.id}
          user={u}
          followingInProgress={followingInProgress}
          unFollow={unFollow}
          follow={follow}
        />

        )}
      </div>
    )
}





export default Users





































