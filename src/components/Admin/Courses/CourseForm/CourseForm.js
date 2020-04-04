import React, { useState, useEffect } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { getAccessTokenApi } from '../../../../api/auth';
import { addCourseApi, updateCourseApi } from '../../../../api/courses';

import './CourseForm.scss';

export default function CourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    course ? setCourseData(course) : setCourseData({});
  }, [course]);

  const addCourse = (e) => {
    e.preventDefault();

    if (!courseData.idCourse) {
      notification['error']({ message: 'El ID del curso es obligatorio.' });
    } else {
      const token = getAccessTokenApi();

      addCourseApi(token, courseData)
        .then((response) => {
          const typeNotification =
            response.code === 200 ? 'success' : 'warning';
          notification[typeNotification]({ message: response.message });
          setReloadCourses(true);
          setIsVisibleModal(false);
          setCourseData({});
        })
        .catch(() => {
          notification['error']({
            message: 'Error del servidor. Intente mas tarde.',
          });
        });
    }
  };

  const updateCourse = (e) => {
    e.preventDefault();

    const token = getAccessTokenApi();

    updateCourseApi(token, course._id, courseData)
      .then((response) => {
        const typeNotification = response.code === 200 ? 'success' : 'error';

        notification[typeNotification]({ message: response.message });
        setReloadCourses(true);
        setIsVisibleModal(false);
        setCourseData({});
      })
      .catch(() => {
        notification['error']({
          message: 'Error del servidor. Intenete mas tarde.',
        });
      });
  };

  return (
    <div className="course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        setCourseData={setCourseData}
        courseData={courseData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { course, setCourseData, addCourse, updateCourse, courseData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmit={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<Icon type="key" />}
          placeholder="ID del curso"
          value={courseData.idCourse}
          onChange={(e) => {
            setCourseData({ ...courseData, idCourse: e.target.value });
          }}
          disabled={
            course ? true : false
          } /* No me deja cambiar el ID cuando edito s*/
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="link" />}
          placeholder="Url del curso"
          value={courseData.link}
          onChange={(e) => {
            setCourseData({ ...courseData, link: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="gift" />}
          placeholder="Cupón de descuento"
          value={courseData.coupon}
          onChange={(e) => {
            setCourseData({ ...courseData, coupon: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="dollar" />}
          placeholder="Precio"
          value={courseData.price}
          onChange={(e) => {
            setCourseData({ ...courseData, price: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="buttton-submit">
          {course ? 'Actualizar Curso' : 'Crear Curso'}
        </Button>
      </Form.Item>
    </Form>
  );
}
