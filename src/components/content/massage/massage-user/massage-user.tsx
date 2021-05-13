import React from "react";
import s from "./massage-user.module.css";

type PropsType = {
  massage:string
}

const MassageUser:React.FC<PropsType> = (props) => {
  return (
    <div className={s.massges}>
      <div className={s.massgesItem}>{props.massage} </div>
    </div>
  );
};

export default MassageUser;
