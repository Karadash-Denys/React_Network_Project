import React, { useState } from "react";
import style from "./Paginator.module.css";
import cn from 'classnames'
import { Button, Pagination } from 'antd';
import { log } from "console";


type Props = {
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  currentPage: number
  portionSize?: number
}


const Paginator: React.FC<Props> = ({totalUsersCount,pageSize,onPageChanged,currentPage,portionSize=10}) => {
    console.log(totalUsersCount  ,' : totalUsersCount');
    console.log(pageSize, ' : pageSize');
    console.log(currentPage, ' : currentPage');
 
    

    const pagesCount = Math.ceil( totalUsersCount / pageSize)
    
    const pages: Array<number> = []
    for (let i = 1; i <= pagesCount; i++){
      pages.push(i)
  }

  const portionCount = Math.ceil(totalUsersCount / portionSize)
  const [portionNumber, setPortionNumber] = useState<number>(1)
  const LeftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize
  console.log(portionNumber, ' : portionNumber');
  return (
    
    <div className={style.paginator} >
     
      {portionNumber > 1 && 
        <Button onClick={() => { setPortionNumber(portionNumber - 1) }} >PREV</Button>}
      {
        pages
          .filter(p => p >= LeftPortionPageNumber && p <= rightPortionPageNumber)
          .map(p => {
            return <div className={cn({
            [style.selectedPage] : currentPage ===p
            }, style.pageNumber)}
              key={p}
              onClick={()=>onPageChanged(p)}
            >{p}</div>
        })
      }
      {portionCount > portionNumber && 
      <Button onClick={()=>{setPortionNumber(portionNumber+1)}} >NEXT</Button>
      }
    </div>
  )

}





export default Paginator





































