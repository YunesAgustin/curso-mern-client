import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { signInApi } from '../../../api/user';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants';

import './LoginForm.scss';

export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const changeForm = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const login = async e => {
    e.preventDefault();

    const result = await signInApi(inputs);

    if (result.message) {
      notification['error']({ message: result.message });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken); // Guardo los tokens en el localStorage por si cierra la pags
      localStorage.setItem(REFRESH_TOKEN, refreshToken); // se mantiene la sesion un tiempo

      notification['success']({ message: 'Login correcto' });

      window.location.href = '/admin'; // Redirecciona al usuario luego de iniciar sesion
    }
  };
  return (
    <Form className="login-form" onChange={changeForm} onSubmit={login}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25' }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
