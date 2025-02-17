import React from 'react';
import { Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import PostListWeb from '../components/Web/Blog/PostListWeb';
import PostInfo from '../components/Web/Blog/PostInfo';

export default function Blog(props) {
  const { location, history } = props;
  const { url } = useParams(); // Me duevuelve la url en caso de tener despues de blog/:url, sino me devuelve un objeto vacio

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        {url ? (
          <PostInfo url={url} />
        ) : (
          <PostListWeb location={location} history={history} />
        )}
      </Col>
      <Col md={4} />
    </Row>
  );
}
