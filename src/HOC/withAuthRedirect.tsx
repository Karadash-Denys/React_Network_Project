import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { AppStateType } from '../redux/Redux_store';


const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}
type MapPropsType = {isAuth:boolean}
type MapDispatchType = {}

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>)  {

    const RedirectContainer:React.FC<MapPropsType & MapDispatchType> = (props) => {
            const {isAuth,...restProps} = props
            if (!isAuth) return <Redirect to='/Login' />
            return <Component {...restProps  as WCP} />
        }
    
    const ConectedAuthRedirectComponent = connect<MapPropsType,MapDispatchType,WCP,AppStateType>(mapStateToProps,{})(RedirectContainer)
    return ConectedAuthRedirectComponent;
}
