import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import useAuth from '../hooks/useAuth';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';
import AdminSignIn from '../pages/Admin/SignIn';

import './LayoutAdmin.scss';

export default function LayoutAdmin(props) {
  const { routes } = props; //Aca se pude aplicar el mismo destructuring que en la funcion LoadRouters..
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const { Header, Content, Footer } = Layout;
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      // <> es un fragment para que return un solo componente hijo
      <>
        <Route path={'/admin/login'} component={AdminSignIn} />
        <Redirect to="/admin/login" />)
      </>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} />
        <Layout
          className="layoutAdmin"
          style={{ marginLeft: menuCollapsed ? '80px' : '200px' }}
        >
          <Header className="layoutAdminHeader">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layoutAdminContent">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layoutAdminFooter">Foooter</Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
}

function LoadRoutes({ routes }) {
  // La llave es un destructuring lo mismo que hacer `const {routes} = props`

  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
