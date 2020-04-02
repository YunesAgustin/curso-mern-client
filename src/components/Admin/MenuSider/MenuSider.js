import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './MenuSider.scss';

// Link to me redirecciona a esa otra url

function MenuSider(props) {
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;
  return (
    <Sider className="adminSider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to="/admin">
            <Icon type="home" />
            <span className="navText">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to="/admin/users">
            <Icon type="user" />
            <span className="navText">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu">
          <Link to="/admin/menu">
            <Icon type="menu" />
            <span className="navText">Menu</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/courses">
          <Link to="/admin/courses">
            <Icon type="book" />
            <span className="navText">Cursos</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

// With Roouter tiene la info de la navegacion y se la pasa al menuSider mediante la prop location
export default withRouter(MenuSider);
