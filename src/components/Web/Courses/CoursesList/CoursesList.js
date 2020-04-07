import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Rate, notification } from 'antd';
import { getCoursesDataUdemyApi } from '../../../../api/courses';

import './CoursesList.scss';

export default function CoursesList(props) {
  const { courses } = props;
  return (
    <div className="courses-list">
      <Row>
        {courses.map((course) => (
          <Col key={course._id} md={8} className="courses-list__course">
            <Course course={course} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Course(props) {
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState({});
  const [urlCourse, seturlCourse] = useState('');

  useEffect(() => {
    getCoursesDataUdemyApi(course.idCourse)
      .then((response) => {
        if (response?.code !== 200) {
          notification['warning']({ message: response.message });
        } else {
          setCourseInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch(() => notification['error']({ message: 'Error del servidor.' }));
  }, [course]);

  const mountUrl = (url) => {
    if (!course.link) {
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl =
        baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : '');
      seturlCourse(finalUrl);
    } else {
      seturlCourse(course.link);
    }
  };

  return (
    <a href={urlCourse} target="e_blank" rel="noopener noreferrer">
      <Card
        className="courses-list__course"
        cover={<img src={courseInfo.image_480x270} alt={courseInfo.tile} />}
      >
        <Card.Meta title={courseInfo.title} description={courseInfo.headline} />
        <Button>Ir al curso</Button>

        <div className="courses-list__course-footer">
          <span>{course.price ? `${course.price} US$` : courseInfo.price}</span>
          <div>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
      </Card>
    </a>
  );
}
