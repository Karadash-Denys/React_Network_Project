import React, { useState } from "react";
import style from "./Paginator.module.css";
import cn from 'classnames'


type Props = {
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  currentPage: number
  portionSize?: number
}


const Paginator: React.FC<Props> = ({totalUsersCount,pageSize,onPageChanged,currentPage,portionSize=10}) => {
    

    const pagesCount = Math.ceil( totalUsersCount / pageSize)
    
    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++){
      pages.push(i)
  }

  const portionCount = Math.ceil(totalUsersCount / portionSize)
  const [portionNumber, setPortionNumber] = useState<number>(1)
  const LeftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize

  return (
    <div className={style.paginator} >
      {portionNumber > 1 && 
        <button onClick={() => { setPortionNumber(portionNumber - 1) }} >PREV</button>}
      {
        pages
          .filter(p => p >= LeftPortionPageNumber && p <= rightPortionPageNumber)
          .map(p => {
            return <span className={cn({
            [style.selectedPage] : currentPage ===p
            }, style.pageNumber)}
              key={p}
              onClick={()=>onPageChanged(p)}
            >{p}</span>
        })
      }
      {portionCount > portionNumber && 
      <button onClick={()=>{setPortionNumber(portionNumber+1)}} >NEXT</button>
      }
    </div>
  )

}





export default Paginator





































