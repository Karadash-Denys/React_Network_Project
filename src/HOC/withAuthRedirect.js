import React from 'react'
import { connect } from 'react-redux'
import { Redirect} from "react-router-dom";


const mapStateToProps = (state) => {
    return {
        isAuth:state.auth.isAuth
    }
}

export const withAuthRedirect = Component => {

    class RedirectContainer extends React.Component {
        render() {
            if(!this.props.isAuth)return <Redirect to='/Login' />
            return <Component {...this.props} />
        }
    }
    const ConectedAuthRedirectComponent = connect(mapStateToProps)(RedirectContainer)
    return ConectedAuthRedirectComponent
}