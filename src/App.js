import React from 'react'
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import ProfileConteiner from './components/content/profile/ProfileContainer';
import MainContainer from './components/content/main/Main_Container';
import MassageContainer from './components/content/massage/Massage_Container';
import UsersContainer from './components/content/Users/Users_Container';
import Header_Container from './components/header/Header_Container';
import Login from './components/Login/Login';
import { initialaizeApp } from './redux/App_Reduser'
import { connect } from 'react-redux'
import Preloader from './common/preloader/Preloader';

class App extends React.Component {

  componentDidMount() {
    this.props.initialaizeApp()
  }

  render() {
    if(!this.props.initialaized) return <Preloader />
    return (
     
      <BrowserRouter>
        <div className="wrapper">
          <Header_Container />
          <Route path='/Main' render={() => <MainContainer/>}></Route>
          <Route path='/Massage' render={() => <MassageContainer/>}></Route>
          <Route path='/Profile/:userId?' render={() => <ProfileConteiner />} ></Route>
          <Route path='/Users' render={() => <UsersContainer />}></Route>
          <Route path='/Login' render={() => <Login />}></Route>
        </div>
       </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  initialaized:state.app.initialaized
})

export default connect(mapStateToProps, { initialaizeApp })(App)



