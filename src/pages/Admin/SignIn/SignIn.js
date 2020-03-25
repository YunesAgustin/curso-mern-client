import React from 'react';
import { Layout, Tabs } from 'antd';
import { Redirect } from 'react-router-dom';
import Logo from '../../../assets/img/logo.png';
import RegisterForm from '../../../components/Admin/RegisterForm';
import LoginForm from '../../../components/Admin/LoginForm';
import { getAccessTokenApi } from '../../../api/auth';
import './SignIn.scss';

export default function SignnIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessTokenApi()) {
    return <Redirect to="/admin" />;
  }
  return (
    <Layout className="signIn">
      <Content className="signInContent">
        <h1 className="signInContentLogo">
          <img src={Logo} alt="Agustin Yunes" />
        </h1>

        <div className="signInContentTabs">
          <Tabs type="card">
            <TabPane tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Nuevo usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
