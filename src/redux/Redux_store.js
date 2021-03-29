import { combineReducers, createStore,applyMiddleware  } from 'redux'
import authReduser from './Auth_Reduser'
import main_page_reduser from './Main_Page_Reducer'
import massage_page_reduser from './Massage_Page_Reduser'
import profileReduser from './Profile_Page_Reducer'
import user_page_reduser from './Users_Reducer'
import thunk from 'redux-thunk'
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

let store = createStore(redusers,applyMiddleware(thunk))

window.store = store

export default store