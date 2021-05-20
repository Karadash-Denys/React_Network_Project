import { combineReducers, createStore,applyMiddleware,compose, Action  } from 'redux'
import authReduser from './Auth_Reduser'
import massage_page_reduser from './Massage_Page_Reduser'
import profileReduser from './Profile_Page_Reducer'
import user_page_reduser from './Users_Reducer'
import thunk, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReduser from './App_Reduser'
import chatReduser from './Chat_Reduser'


let redusers = combineReducers({
    massagePage: massage_page_reduser,
    usersPage: user_page_reduser,
    profilePage: profileReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser,
    chat: chatReduser
})

type RedusersType = typeof redusers
export type AppStateType = ReturnType<RedusersType>


export type InferActionsType<T> = T extends { [key: string]: (...args: any[]) => infer U }? U : never  //типизация actions

export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>//типизация thunkCreator


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers,  composeEnhancers(applyMiddleware(thunk)));

// let store = createStore(redusers,applyMiddleware(thunk)) // Две строки выше заменили создание, для расширения


export default store