import React from "react";
import Header from './header'
import { connect } from "react-redux";
import {logout} from '../../redux/Auth_Reduser'
import { AppStateType } from "../../redux/Redux_store";

type MapPropsType = {
  isAuth: boolean
  login: string | null
}
type DispatchPropsType = {
  logout:()=>void
}

class Header_Container extends React.Component<MapPropsType & DispatchPropsType>{

  render() {
    return (
      <Header {...this.props} />
    );
  }
}


const mapStateToProps = (state:AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

export default connect<MapPropsType,DispatchPropsType,{},AppStateType>(mapStateToProps,{logout})(Header_Container);
