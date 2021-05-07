import React from "react";
import { NavLink } from "react-router-dom";
import s from "./header.module.css";

const Header = (props) => {


  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.logoUser}>
          {props.isAuth
            ? <p>{props.login} <button onClick={props.logout} >Log out</button> </p>
            : <NavLink to={'/Login'} >Login</NavLink>}
        </div>
        <div className="logo">
          <NavLink to='/Profile'>
            <img
              className={s.logo}
              src="https://www.instagram.com/static/images/ico/favicon-200.png/ab6eff595bb1.png"
              alt="logo"
            />
          </NavLink>
        </div>
        <nav>
          <ul className={s.nav1}>
            <li className={s.nav}>
              <NavLink to="/Main">Main</NavLink>
            </li>
            <li className={s.nav}>
              <NavLink to="/Massage">
                Massage
              </NavLink>
            </li>
            <li className={s.nav}>
              <NavLink to="/Profile">
                Profile
              </NavLink>
            </li>
            <li className={s.nav}>
              <NavLink to="/Users">
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
