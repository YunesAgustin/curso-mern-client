import React, { useState, useEffect } from 'react';
import { Button, List, Icon, Modal as ModalAntd, notification } from 'antd';
import DragSortableList from 'react-drag-sortable';
import Modal from '../../../Modal';
import CourseForm from '../CourseForm';
import {
  getCoursesDataUdemyApi,
  updateCourseApi,
} from '../../../../api/courses';
import { getAccessTokenApi } from '../../../../api/auth';

import './CoursesList.scss';

const { confirm } = ModalAntd;
export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const listCoursesArray = [];

    courses.forEach((course) => {
      listCoursesArray.push({
        content: (
          <Course
            course={course}
            setReloadCourses={setReloadCourses}
            editCourseModal={editCourseModal}
            deleteCourse={deleteCourse}
          />
        ),
      });
    });
    setListCourses(listCoursesArray);
  }, [courses]);

  const onSort = (sortedList, dropEvent) => {
    const token = getAccessTokenApi();
    console.log(sortedList);
    sortedList.forEach((item) => {
      const id = item.content.props.course._id;
      const order = item.rank;
      updateCourseApi(token, id, { order });
    });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando nuevo curso.');
    setModalContent(
      <CourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  const editCourseModal = (course) => {
    setIsVisibleModal(true);
    setModalTitle('Actualizando curso.');
    setModalContent(
      <CourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  const deleteCourse = (course) => {
    const token = getAccessTokenApi();

    confirm({
      title: 'Eliminando curso',
      content: `Estas seguro que quieres eliminar el curso ${course.title}`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk() {
        updateCourseApi(token, course._id, { logicDelete: true })
          .then((response) => {
            if (response.code !== 200) {
              notification['error']({ message: response.message });
            } else {
              notification['success']({ message: response.message });
              setReloadCourses(true);
            }
          })
          .catch(() => {
            notification['error']({ message: 'Error en el servidor.' });
          });
      },
    });
  };

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Nuevo Curso
        </Button>
      </div>

      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: 'center', margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <DragSortableList items={listCourses} onSort={onSort} type="vertical" />
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Course(props) {
  const { course, editCourseModal, deleteCourse } = props;
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    getCoursesDataUdemyApi(course.idCourse).then((response) => {
      if (response.code !== 200) {
        notification['warning']({
          message: `El curso en el id ${course.idCourse} no se ha encontrado`,
        });
      }
      setCourseData(response.data);
    });
  }, [course]);

  if (!courseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editCourseModal(course)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteCourse(course)}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <img
        src={courseData.image_480x270}
        alt={courseData.title}
        style={{ width: '100px', marginRight: '20px' }}
      />
      <List.Item.Meta
        title={`${courseData.title} | ${course.idCourse}`}
        description={courseData.headline}
      />
    </List.Item>
  );
}
