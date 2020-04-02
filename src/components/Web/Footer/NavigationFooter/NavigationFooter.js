import React from 'react';
import { Col, Row, Icon } from 'antd';

import './NavigationFooter.scss';
import { Link } from 'react-router-dom';

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col>
        <h3>Navegación</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="https://www.udemy.com">
          <Icon type="book" /> Cursos Online
        </a>
      </li>
      <li>
        <Link to="/contact">
          {/* Para apubntar a un link interno */}
          <Icon type="code" /> Desarrollo Web
        </Link>
      </li>
      <li>
        <a href="https://www.udemy.com">
          <Icon type="database" /> Base de datos
        </a>
      </li>
      <li>
        <a href="https://www.udemy.com">
          <Icon type="right" /> Politicas de privacidad
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="https://www.udemy.com">
          <Icon type="hdd" /> Sistemas servidores
        </a>
      </li>
      <li>
        <Link to="/contact">
          {/* Para apubntar a un link interno */}
          <Icon type="appstore" /> CMS
        </Link>
      </li>
      <li>
        <a href="https://www.udemy.com">
          <Icon type="user" /> Porfolio
        </a>
      </li>
      <li>
        <a href="https://www.udemy.com">
          <Icon type="right" /> Politicas de cookies
        </a>
      </li>
    </ul>
  );
}
