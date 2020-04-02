import React from 'react';
import { Row, Col, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import jr10 from '../../../assets/img/jr10.jpg';
import palermo from '../../../assets/img/palermo.jpg';
import tevez from '../../../assets/img/tevez.jpg';
import benedetto from '../../../assets/img/benedetto.jpg';
import messi from '../../../assets/img/messi.jpg';

import './HomeCourses.scss';

export default function HomeCourses() {
  return (
    <Row className="home-presentation">
      <Col lg={24} className="home-presentation__title">
        <h2>Presentanding</h2>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-courses">
          <Col md={6}>
            <CardPresentation
              image={jr10}
              title="Juan Roman Riquelme"
              subtitle="Moostroo"
              link="https://es.wikipedia.org/wiki/Juan_Rom%C3%A1n_Riquelme"
            />
          </Col>
          <Col md={6}>
            <CardPresentation
              image={palermo}
              title="Martin Palermo"
              subtitle="Craack"
              link="https://es.wikipedia.org/wiki/Mart%C3%ADn_Palermo"
            />
          </Col>
          <Col md={6}>
            <CardPresentation
              image={tevez}
              title="Juan Roman Riquelme"
              subtitle="Moostroo"
              link="https://es.wikipedia.org/wiki/Juan_Rom%C3%A1n_Riquelme"
            />
          </Col>
          <Col md={6}>
            <CardPresentation
              image={messi}
              title="Juan Roman Riquelme"
              subtitle="Moostroo"
              link="https://es.wikipedia.org/wiki/Juan_Rom%C3%A1n_Riquelme"
            />
          </Col>
        </Row>
        <Row className="row-courses">
          <Col md={6}>
            <CardPresentation
              image={benedetto}
              title="Juan Roman Riquelme"
              subtitle="Moostroo"
              link="https://es.wikipedia.org/wiki/Juan_Rom%C3%A1n_Riquelme"
            />
          </Col>
        </Row>
      </Col>

      <Col lg={4} />
      <Col lg={24} className="home-presentation__more">
        {/* Con lg 24 ocupo toda la pantalla*/}
        <Link to="/courses">
          <Button>Ver mas</Button>
        </Link>
      </Col>
    </Row>
  );
}

function CardPresentation(props) {
  const { image, title, subtitle, link } = props;
  const { Meta } = Card;

  return (
    <a href={link} target="e_blank" rel="noopener noreferrer">
      <Card
        className="home-presentation__card"
        cover={
          <img src={image} alt={title} style={{ width: 200, height: 200 }} />
        }
        actions={[<Button>Ingresar</Button>]}
      >
        <Meta title={title} description={subtitle}></Meta>
      </Card>
    </a>
  );
}
