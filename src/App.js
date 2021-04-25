import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import Nav from './components/nav';
import Account from './components/account';
import Home from './components/home';
import Post from './components/post';
import Register from './components/register';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Header>
        <Nav />
      </Header>

      <Content>
        <Switch>
          <Route path="/account" children={<Account />} />
          <Route path="/register" children={<Register />} />
          <Route path="/post/:id" children={<Post />} />
          <Route path="/" children={<Home />} exact />
        </Switch>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Created for Canine Dogs Shelter</Footer>

    </Router>
  );
}

export default App;
