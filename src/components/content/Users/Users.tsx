import React, { useEffect } from "react";
import s from "./user.module.css";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User";
// import { UserType } from "../../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersObjSuperSelector } from "../../../redux/Users_Selector";
import { getUsers, unFollow,follow } from "../../../redux/Users_Reducer";


type Props = {
  // totalUsersCount: number
  // pageSize: number
  // users: Array<UserType>
  // followingInProgress: Array<number>
  // unFollow: (userId:number) => void
  // follow: (userId:number) => void
  // onPageChanged: (pageNumber:number) => void
  // currentPage: number
}


const Users: React.FC<Props> = () => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsersObjSuperSelector)
  const followingInProgress = useSelector(getFollowingInProgress)




  const dispatch = useDispatch()

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter))
  }
  const folow = (id: number) => {
    dispatch(follow(id))
  }
  const unFolow = (id: number) => {
    dispatch(unFollow(id))
  }
  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter))
  },[currentPage, pageSize, filter,dispatch])







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
          unFollow={unFolow}
          follow={folow}
        />

        )}
      </div>
    )
}





export default Users





































