import React from "react"
import style from "./Login.module.css"
import { InjectedFormProps, reduxForm } from "redux-form"
import { Input, createField } from "../../common/FormsControl/FormsControl"
import { required } from "../utils/validators/validators"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/Auth_Reduser"
import { Redirect } from "react-router-dom"
import { AppStateType } from "../../redux/Redux_store"

const LoginForm: React.FC<
    InjectedFormProps<loginFormValuesType, LoginFormOwnPropsType> &
        LoginFormOwnPropsType
> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<loginFormValuesTypeKeys>(
                "email",
                "email",
                [required],
                Input
            )}
            {createField<loginFormValuesTypeKeys>(
                "Password",
                "password",
                [required],
                Input,
                { type: "password" }
            )}
            {createField<loginFormValuesTypeKeys>(
                undefined,
                "rememberMe",
                [],
                Input,
                { type: "checkBox" },
                "remember me"
            )}
            {captchaUrl && <img src={captchaUrl} alt="" />}
            {captchaUrl &&
                createField<loginFormValuesTypeKeys>(
                    "Enter Symbols",
                    "captcha",
                    [required],
                    Input
                )}
            {error && <div className={style.formSummuryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<loginFormValuesType, LoginFormOwnPropsType>({
    form: "login",
})(LoginForm)

type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type loginFormValuesTypeKeys = keyof loginFormValuesType

const Login: React.FC = () => {

  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmitLogin = (formData: loginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe,formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/Profile"} />
    }

    return (
        <div className={style.loginBlock}>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmitLogin} captchaUrl={captchaUrl} />
        </div>
    )
}

type LoginFormOwnPropsType = {
    captchaUrl: string | null
}

export default Login
