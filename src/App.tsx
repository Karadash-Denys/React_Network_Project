import React from "react"
import "./App.css"
import "antd/dist/antd.css"
import {  Redirect, Route, Switch,withRouter } from "react-router-dom"
import UsersContainer from "./components/content/Users/Users_Container"
import Login from "./components/Login/Login"
import { initialaizeApp } from "./redux/App_Reduser"
import { connect } from "react-redux"
import Preloader from "./common/preloader/Preloader"
import { compose } from "redux"
import store, { AppStateType } from "./redux/Redux_store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { withSuspense } from "./HOC/withSuspense"
import ProfilePage from "./components/content/profile/ProfileContainer"
import { Layout} from 'antd';
import Header from "./components/header/header"
// import { ChatPage } from "./components/content/chat/ChatPage"

// import ProfileConteiner from './components/content/profile/ProfileContainer';


const ChatPage = React.lazy(
    () => import("./components/content/chat/ChatPage")
)

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initialaizeApp: () => void
}


const SuspendedChatPage= withSuspense(ChatPage)

class App extends React.Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initialaizeApp()
    }

    render() {
      if (!this.props.initialaized) return <Preloader />
      const { Content, Footer } = Layout;
     
      return (
        <Layout>

          <Header />
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
          <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/Profile" />}
                    ></Route>
                    <Route
                        path="/Profile/:userId?"
                        render={() => <ProfilePage />}
                    ></Route>
                    <Route
                        path="/Users"
                        render={() => <UsersContainer pageTitle={"Samurai"} />}
                    ></Route>
                    <Route path="/Login" render={() => <Login />}></Route>
                    <Route path="/Chat" render={() => <SuspendedChatPage />}></Route>
                    <Route
                        path="*"
                        render={() => (
                          <div>
                                <h1>404 NOT FOUND</h1>
                            </div>
                        )}
                    ></Route>
                </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialaized: state.app.initialaized,
})

const AppContainer = compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, { initialaizeApp })
)(App)

const MainApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp


