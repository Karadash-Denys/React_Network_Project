import React from "react";
import { NavLink } from "react-router-dom";
import s from "./dialogs.module.css";

const Dialogs = (props) => {
  return (
    <div className={s.dialogs}>
      <div className={s.user}>
        <NavLink
          to={"/src/components/content/massage/massage.jsx/dialogs/" + props.id}
        >
          {props.name}
        </NavLink>
      </div>
    </div>
  );
};

export default Dialogs;
