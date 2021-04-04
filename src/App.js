import React from 'react'
import './App.css';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import UsersContainer from './components/content/Users/Users_Container';
import HeaderContainer from './components/header/Header_Container';
import Login from './components/Login/Login';
import { initialaizeApp } from './redux/App_Reduser'
import { connect } from 'react-redux'
import Preloader from './common/preloader/Preloader';
import { compose } from 'redux';
import store from './redux/Redux_store'
import {Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {withSuspense} from './HOC/withSuspense'


// import MassageContainer from './components/content/massage/Massage_Container';
// import ProfileConteiner from './components/content/profile/ProfileContainer';
// import MainContainer from './components/content/main/Main_Container';
const MassageContainer = React.lazy(() => import('./components/content/massage/Massage_Container'));
const ProfileConteiner = React.lazy(() => import('./components/content/profile/ProfileContainer'));
const MainContainer = React.lazy(() => import('./components/content/main/Main_Container'));

class App extends React.Component {
 
  componentDidMount() {
    this.props.initialaizeApp()
  }
 

  render() {
    if(!this.props.initialaized) return <Preloader />
    return (
   
      <div className="wrapper">
        
        <HeaderContainer />
        <Switch>
        <Route exact path='/' render={()=> <Redirect to='/Profile' /> } ></Route>
          <Route path='/Main' render={withSuspense(MainContainer  )}></Route>
          <Route path='/Massage' render={ withSuspense(MassageContainer )}></Route>
          <Route path='/Profile/:userId?' render={withSuspense(ProfileConteiner  )} ></Route>
          <Route path='/Users' render={() => <UsersContainer />}></Route>
          <Route path='/Login' render={() => <Login />}></Route>
          <Route path='*' render={() => <div><h1>404 NOT FOUND</h1></div>}></Route>
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  initialaized:state.app.initialaized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initialaizeApp })
)(App)

const MainApp = props => {
  return  <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
    </BrowserRouter>
}

export default MainApp


