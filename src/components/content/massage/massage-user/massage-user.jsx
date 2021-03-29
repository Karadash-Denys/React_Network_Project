import React from "react";
import s from "./massage-user.module.css";

const MassageUser = (props) => {
  return (
    <div className={s.massges}>
      <div className={s.massgesItem}>{props.massage} </div>
    </div>
  );
};

export default MassageUser;
