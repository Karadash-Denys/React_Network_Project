import React from "react";
import style from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input } from "../../common/FormsControl/FormsControl";
import { required } from "../utils/validators/validators";
import { connect } from 'react-redux'
import { login, logout } from '../../redux/Auth_Reduser'
import {Redirect} from 'react-router-dom'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"email"}
          name={"email"}
          validate={[required]}
          component={Input}
        />
      </div>
      <div>
        <Field
                  placeholder={"Password"}
                  type='password'
          validate={[required]}
          name={"password"}
          component={Input}
        />
      </div>
      <div>
        <Field
          component={Input}
          name={"rememberMe"}
          type={"checkBox"}
        />{" "}
        remember me
      </div>
     { props.error && <div className={style.formSummuryError}>
        {props.error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmitLogin = (formData) => {
    props.login(formData.email,formData.password,formData.rememberMe)
    };
    
    if (props.isAuth) {
        return <Redirect to={'/Profile'} />
    }

  return (
    <div className={style.loginBlock}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmitLogin} />
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        isAuth:state.auth.isAuth
    }
}

export default connect (mapStateToProps,{login,logout})(Login) ;
