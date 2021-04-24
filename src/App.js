import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Nav from './components/nav';
import Account from './components/account';
import Home from './components/home';
import Post from './components/post';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      
      <Header>
        <Nav />
      </Header>
      
      <Content>
        <Switch>
          <Route path="/account" children={<Account />} />
          <Route path="/post/:id" children={<Post />} />
          <Route path="/" children={<Home />} />
        </Switch>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Created for Web API Development</Footer>

    </Layout>
  );
}

export default App;
