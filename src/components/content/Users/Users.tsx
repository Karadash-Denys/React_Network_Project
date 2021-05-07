import React from "react";
import s from "./user.module.css";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../../types/types";


type Props = {
  totalUsersCount: number
  pageSize: number
  users: Array<UserType>
  followingInProgress: Array<number>
  unFollow: (userId:number) => void
  follow: (userId:number) => void
  onPageChanged: (pageNumber:number) => void
  currentPage: number
}


const Users: React.FC<Props> = ({totalUsersCount,pageSize,users,followingInProgress,unFollow,follow,onPageChanged,currentPage}) => {

    return (
      <div className={s.users_block}>
        <Paginator
          totalUsersCount={totalUsersCount}
          currentPage={currentPage}
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





































