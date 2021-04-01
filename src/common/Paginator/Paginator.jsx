import React from "react";
import style from "./Paginator.module.css";





const Paginator = ({totalUsersCount,pageSize,onPageChanged,currentPage}) => {
    

    const pagesCount = Math.ceil( totalUsersCount / pageSize)
    
    const pages = []
    for (let i = 1; i <= pagesCount; i++){
      pages.push(i)
  }

    return (
        <div>
        {pages.map(p => <span
          key={p}
          className={currentPage === p ? style.selectedPage : undefined}
          onClick={() => { onPageChanged(p) }}>-{p} </span>)}
        </div>
    )
}





export default Paginator





































