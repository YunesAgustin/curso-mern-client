import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './MenuSider.scss';

export default function MenuSider(props) {
  const { menuCollapsed } = props;
  const { Sider } = Layout;
  return (
    <Sider className="adminSider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link to={'/admin'}>
            <Icon type="home" />
            <span className="navText">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={'/admin/menu-web'}>
            <Icon type="menu" />
            <span className="navText">Menu Web</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
