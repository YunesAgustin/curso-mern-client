import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop';

import './LayoutBasic.scss';

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { Footer } = Layout;

  return (
    <Row>
      {/* Con el lg en el col le digo que ocupe pantalla completa
      en los dispositivos mas chicos cel, ipad pero en la pc y las pantallas
      grandes que me deje ese espacio a los costados */}
      <Col lg={4} />
      <Col lg={16}>
        <MenuTop />
        <LoadRoutes routes={routes} />
        <Footer>Fooooooooter</Footer>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function LoadRoutes({ routes }) {
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
