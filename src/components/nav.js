import { Menu } from 'antd';
import { Link } from "react-router-dom";

function Nav(props) {
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/">Categories</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/">Contact</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/">Account</Link></Menu.Item>        
      </Menu>
    </>
  );
}

export default Nav;