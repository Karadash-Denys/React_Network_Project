import React from "react";
import s from "./header.module.css";
import Header from './header'
import { connect } from "react-redux";
import {logout} from '../../redux/Auth_Reduser'

class Header_Container extends React.Component{
  

  


  render() {
    return (
      <Header {...this.props} />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export default connect(mapStateToProps,{logout})(Header_Container);
