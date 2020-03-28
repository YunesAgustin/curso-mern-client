import React, { useState } from 'react';
import {
  Input,
  Icon,
  Form,
  Select,
  Button,
  Row,
  Col,
  notification
} from 'antd';
import { signUpAdminApi } from '../../../../api/user';
import { getAccessTokenApi } from '../../../../api/auth';

import './AddUserForm.scss';

export default function EditUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  const addUser = e => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification['error']({ message: 'Todos los campos son obligatorios.' });
    } else if (userData.password !== userData.repeatPassword) {
      notification['error']({ message: 'Las contraseñas deben ser iguales' });
    } else {
      const token = getAccessTokenApi();

      signUpAdminApi(token, userData)
        .then(response => {
          notification['success']({ message: response });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch(err => {
          notification['error']({ message: err });
        });
    }
  };
  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onSubmit={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Nombre"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="user" />}
              placeholder="Apelldo"
              value={userData.lastname}
              onChange={e =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="mail" />}
              placeholder="Correo electronico"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un rol"
              onChange={e => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewr">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              placeholder="Contraseña"
              type="password"
              value={userData.password}
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon type="lock" />}
              placeholder="Repetir contraseña"
              type="password"
              value={userData.repeatPassword}
              onChange={e =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="button-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
