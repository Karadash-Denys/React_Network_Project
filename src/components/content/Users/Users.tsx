import React, { useEffect } from "react";
import s from "./user.module.css";
import Paginator from "../../../common/Paginator/Paginator";
import User from "./User";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersObjSuperSelector } from "../../../redux/Users_Selector";
import { getUsers, unFollow,follow } from "../../../redux/Users_Reducer";
import { useHistory } from "react-router";





const Users: React.FC = () => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const users = useSelector(getUsersObjSuperSelector)
  const followingInProgress = useSelector(getFollowingInProgress)



  const history = useHistory()
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
    const params = new URLSearchParams(history.location.search)
    let actualPage = currentPage
    let actualFilter = filter

    if(!!params.get('term')) actualFilter={...actualFilter,term:params.get('term') as string}
    if(!!params.get('page')) actualPage = Number(params.get('page'))
    if(!!params.get('friend')) actualFilter = {...actualFilter,friend:params.get('friend') === 'null'? null:params.get('friend')==='true'?true:false}
    
    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    history.push({
      pathname: '/Users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    })
  },[filter,currentPage]) 







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





































