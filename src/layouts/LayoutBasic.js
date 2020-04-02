import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'antd';
import MenuTop from '../components/Web/MenuTop';
import Footer from '../components/Web/Footer';

import './LayoutBasic.scss';

export default function LayoutAdmin(props) {
  const { routes } = props;

  return (
    <>
      <Row>
        {/* Con el lg en el col le digo que ocupe pantalla completa
      en los dispositivos mas chicos cel, ipad pero en la pc y las pantallas
      grandes que me deje ese espacio a los costados */}
        <Col lg={4} />
        <Col lg={16}>
          <MenuTop />
        </Col>
        <Col lg={4} />
      </Row>
      <LoadRoutes routes={routes} />
      <Footer />
    </>
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
