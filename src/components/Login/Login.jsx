import React from "react";
import style from "./Login.module.css";
import { Field, reduxForm } from "redux-form";
import { Input,createField } from "../../common/FormsControl/FormsControl";
import { required } from "../utils/validators/validators";
import { connect } from 'react-redux'
import { login, logout } from '../../redux/Auth_Reduser'
import {Redirect} from 'react-router-dom'

const LoginForm = ({handleSubmit,error,captchaUrl}) => {
  return (
    <form onSubmit={handleSubmit}>
      
      {createField("email", "email", [required], Input)}
      {createField("Password","password",[required],Input,{type:"password"})}
      {createField(null,"rememberMe",[],Input,{type:"checkBox"},'remember me')}
      {captchaUrl && <img src={captchaUrl} alt='' /> }
      {captchaUrl && createField("Enter Symbols", "captcha", [required], Input) }
     { error && <div className={style.formSummuryError}>
        {error}
      </div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = ({login,isAuth,captchaUrl}) => {
  const onSubmitLogin = (formData) => {
    login(formData.email,formData.password,formData.rememberMe,formData.captcha)
    };
    
    if (isAuth) {
        return <Redirect to={'/Profile'} />
    }

  return (
    <div className={style.loginBlock}>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmitLogin} captchaUrl={captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => {
    return {
        isAuth:state.auth.isAuth,
        captchaUrl:state.auth.captchaUrl
    }
}

export default connect (mapStateToProps,{login,logout})(Login) ;
