import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';


import UserAccount from './components/user/userAccount';
import UserRegister from './components/user/userRegister';
import UserLogin from './components/user/userLogin';
import UserUpdate from './components/user/userUpdate';

import Nav from './components/main/nav';
import Home from './components/main/home';
import Post from './components/main/post';

import UserContext from './contexts/user';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {loggedIn: false}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("User is now being set on the context");
    user.loggedIn = true;
    this.setState({user:user});
  }

  logout() {
    console.log("Removing user from the app context");
    this.setState({user: {loggedIn:false}});
  }

  render () {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };

    return (
      <UserContext.Provider value={context}>
        <Router>
          <Header>
            <Nav />
          </Header>

          <Content>
            <Switch>
    
              <Route path="/userAccount" children={<UserAccount />} />
              <Route path="/userRegister" children={<UserRegister />} />
              <Route path="/userLogin" children={<UserLogin />} />
              <Route path="/userUpdate" children={<UserUpdate />} />
                
              <Route path="/post/:id" children={<Post />} />
              <Route path="/" children={<Home />}/>
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Created for Web API Development</Footer>

        </Router>
      </UserContext.Provider>  
    );
  }
}

export default App;
