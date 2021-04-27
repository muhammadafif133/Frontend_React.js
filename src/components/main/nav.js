import React from 'react';
import {useContext} from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../../contexts/user';

// Icons usage
import { HomeOutlined, UserAddOutlined, UserOutlined, 
    LogoutOutlined, IdcardOutlined, SettingOutlined, 
    ShopOutlined, UserDeleteOutlined, EditOutlined,
    StarOutlined, PlusSquareOutlined, DeleteOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;

function Nav(props) {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  const role = context.user.role;
  const username = context.user.username;
  console.log(context);
  
  let LoginNav;
  if (!loggedIn) {
    LoginNav = (
      <>
      <Menu.Item key="2" icon = <UserAddOutlined /> >
        <Link to="/userRegister">Register</Link>
      </Menu.Item>
      <Menu.Item key="3" icon = <UserOutlined />>
        <Link to="/userLogin">Login</Link>
      </Menu.Item>
      </>
    )
  } else if (role === 'user'){
    LoginNav = (
      <>
      <SubMenu key = "1" icon = <UserOutlined /> title = "User Account">
          <Menu.Item key="account: 1" icon = {<IdcardOutlined />}><Link to="/userAccount"> {username} </Link></Menu.Item>
          <Menu.Item key="account: 2" icon = {<EditOutlined />}><Link to="/userUpdate"> Update Account </Link></Menu.Item>
          <Menu.Item key="account: 3" icon = {<LogoutOutlined />} onClick={context.logout}><Link to="/">Logout</Link></Menu.Item>
       </SubMenu>
       
       <SubMenu key = "2" icon = <ShopOutlined /> title = "Canine Dogs Shelter">
          <Menu.ItemGroup title = "Activity">
              <Menu.Item key="4" icon = {<StarOutlined />}><Link to = "/dogFavourite"> Dog Favourites </Link></Menu.Item>
          </Menu.ItemGroup>
      </SubMenu>
      </>
    )
  } else if (role === 'employee'){
    LoginNav = (
        <>
        <SubMenu key = "3" icon = <UserOutlined /> title = "Employee Account">
            <Menu.Item key="account: 1" icon = {<IdcardOutlined />}><Link to="/userAccount"> {username} </Link></Menu.Item>
            <Menu.Item key="account: 2" icon = {<EditOutlined />}><Link to="/userUpdate"> Update Account </Link></Menu.Item>
            <Menu.Item key="account: 3" icon = {<LogoutOutlined />} onClick={context.logout}><Link to="/">Logout</Link></Menu.Item>
         </SubMenu>

         <SubMenu key = "4" icon = <ShopOutlined /> title = "Canine Dogs Shelter">
            <Menu.ItemGroup title = "Activity">
                <Menu.Item key="dog: 1" icon = {<PlusSquareOutlined />}><Link to = "/createListing"> List New Dog </Link></Menu.Item>
                <Menu.Item key="dog: 2" icon = {<EditOutlined />}><Link to = "/updateListing"> Update Dog </Link></Menu.Item>
                <Menu.Item key="dog: 3" icon = {<DeleteOutlined />}><Link to = "/deleteListing"> Delete Dog </Link></Menu.Item>
            </Menu.ItemGroup>
        </SubMenu>
        </>    
      )
    } else if (role === 'admin'){
      LoginNav = (
        <>
        <SubMenu key = "5" icon = <UserOutlined /> title = "Admin Account">
            <Menu.Item key="account: 1" icon = {<IdcardOutlined />}><Link to="/userAccount"> {username} </Link></Menu.Item>
            <Menu.Item key="account: 2" icon = {<EditOutlined />}><Link to="/userUpdate"> Update Account </Link></Menu.Item>
            <Menu.Item key="account: 3" icon = {<LogoutOutlined />} onClick={context.logout}><Link to="/">Logout</Link></Menu.Item>
         </SubMenu>

         <SubMenu key = "6" icon = <SettingOutlined /> title = "User Account Setting">
            <Menu.ItemGroup title = "Activity">
            <Menu.Item key="useraccount: 1" icon = {<UserDeleteOutlined />}><Link to="/adminDelete"> Delete User Account </Link></Menu.Item>
            <Menu.Item key="useraccount: 2" icon = {<EditOutlined />}><Link to="/adminUpdate"> Update User Account </Link></Menu.Item>
            </Menu.ItemGroup>
        </SubMenu>

         <SubMenu key = "7" icon = <ShopOutlined /> title = "Canine Dogs Shelter">
            <Menu.ItemGroup title = "Activity">
                <Menu.Item key="12" icon = {<DeleteOutlined />}><Link to = "/deleteDog"> Delete Dog </Link></Menu.Item>
            </Menu.ItemGroup>
        </SubMenu>
        </>    
      )
    }
  return (
    <>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/">Home</Link></Menu.Item>
      {LoginNav}
    </Menu>
    </>
  );
}

export default Nav;