import React from "react";
import { NavLink } from "react-router-dom";
import s from "./dialogs.module.css";


type PropsType = {
  name: string
  id:number
}

const Dialogs:React.FC<PropsType> = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.user}>
        <NavLink
          to={`/Massage/${props.id}`}
        >
          {props.name}
        </NavLink>
      </div>
    </div>
  );
};

export default Dialogs;
