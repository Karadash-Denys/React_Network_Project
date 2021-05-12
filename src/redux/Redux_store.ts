import { combineReducers, createStore,applyMiddleware,compose, Action  } from 'redux'
import authReduser from './Auth_Reduser'
import main_page_reduser from './Main_Page_Reducer'
import massage_page_reduser from './Massage_Page_Reduser'
import profileReduser from './Profile_Page_Reducer'
import user_page_reduser from './Users_Reducer'
import thunk, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReduser from './App_Reduser'


let redusers = combineReducers({
    mainPage:main_page_reduser,
    massagePage: massage_page_reduser,
    usersPage: user_page_reduser,
    profilePage: profileReduser,
    auth: authReduser,
    form: formReducer,
    app:appReduser
})

type RedusersType = typeof redusers
export type AppStateType = ReturnType<RedusersType>


type PropertiesType<T> = T extends {[key:string]: infer U} ? U : never
export type InferActionsType<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>//типизация actions

export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>//типизация thunkCreator


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers,  composeEnhancers(applyMiddleware(thunk)));

// let store = createStore(redusers,applyMiddleware(thunk)) // Две строки выше заменили создание, для расширения


export default store