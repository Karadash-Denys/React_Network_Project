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
import store, { AppStateType } from './redux/Redux_store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { withSuspense } from './HOC/withSuspense';
import ProfilePage from './components/content/profile/ProfileContainer';


// import ProfileConteiner from './components/content/profile/ProfileContainer';
// import MainContainer from './components/content/main/Main_Container';
const MassageContainer = React.lazy(() => import('./components/content/massage/Massage_Container'));
const ProfileConteiner = React.lazy(() => import('./components/content/profile/ProfileContainerClass'));

type MapPropsType = ReturnType< typeof mapStateToProps >
type DispatchPropsType = {
  initialaizeApp:()=>void
}

const SuspendedMassageContainer = withSuspense(MassageContainer )
const SuspendedProfileConteiner = withSuspense(ProfileConteiner  )

class App extends React.Component<MapPropsType & DispatchPropsType> {
 
  componentDidMount() {
    this.props.initialaizeApp()
  };
 

  render() {
    if(!this.props.initialaized) return <Preloader />
    return (
   
      <div className="wrapper">
        
        <HeaderContainer />
        <Switch>
        <Route exact path='/' render={()=> <Redirect to='/Profile' /> } ></Route>
          <Route path='/Massage' render={()=><SuspendedMassageContainer/> }></Route>
          {/* <Route path='/Profile/:userId?' render={()=><SuspendedProfileConteiner/>} ></Route> */}
          <Route path='/Profile/:userId?' render={()=><ProfilePage />} ></Route>
          <Route path='/Users' render={() => <UsersContainer pageTitle={'Samurai'} />}></Route>
          <Route path='/Login' render={() => <Login />}></Route>
          <Route path='*' render={() => <div><h1>404 NOT FOUND</h1></div>}></Route>
          </Switch>
        </div>
    );
  }
}

const mapStateToProps = (state:AppStateType) => ({
  initialaized:state.app.initialaized
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initialaizeApp })
)(App)

const MainApp: React.FC = () => {
  return  <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
}

export default MainApp


