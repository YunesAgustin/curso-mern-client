import React, { useState } from 'react';
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import {
  emailValidation,
  minLengthValidation
} from '../../../utils/formValidation';

import './RegisterForm.scss';
import { signUpApi } from '../../../api/user';

export default function RegisterForm() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    privacyPolicy: false
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false
  });

  const changeForm = e => {
    // Recibe el evento de un cambio en el form y usa el name que le dimos a cada componente
    if (e.target.name === 'privacyPolicy') {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.checked
      });
    } else {
      setInputs({
        ...inputs,
        [e.target.name]: e.target.value
      });
    }
  };

  const inputValidation = e => {
    const { type, name } = e.target; // e.target es el input completo..

    if (type === 'email') {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === 'password') {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if (type === 'checkbox') {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = async e => {
    e.preventDefault(); // Para que no recargue el form, ya que el onSumbit recarga automaticamente
    const emailValue = inputs.email;
    const passwordValue = inputs.password;
    const repeatPasswordValue = inputs.repeatPassword;
    const privacyPolicyValue = inputs.privacyPolicy;
    // No se puede hacer destructuring a los dos states porq al llamarse igual si se hace daria error,
    // se los llama igual por la logica de la validacion

    if (
      !emailValue ||
      !passwordValue ||
      !repeatPasswordValue ||
      !privacyPolicyValue
    ) {
      notification['error']({ message: 'Todos los campos son obligatorios' });
    } else {
      if (passwordValue !== repeatPasswordValue) {
        notification['error']({
          message: 'Las contraseñas tienen que ser iguales'
        });
      } else {
        // Conectar con el API Y registrar el usuario.
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification['error']({
            message: result.message
          });
        } else {
          notification['success']({
            message: result.message
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName('input'); // Para recoger todos los tags input

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove('success');
      inputs[i].classList.remove('error');
    }

    setInputs({
      email: '',
      password: '',
      repeatPassword: '',
      privacyPolicy: false
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    });
  };

  return (
    <Form className="register-form" onChange={changeForm} onSubmit={register}>
      {/* onChange se ejecuta cuando hay algun cambio en  el formulario */}
      {/*onSubmit se ejecuta cuando se hace click en el boton ya q es de tipo submit*/}
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25' }} />}
          type="email"
          name="email"
          placeholder="Correo electronico..."
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25' }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          checked={inputs.privacyPolicy}
          onChange={inputValidation}
        >
          He leído y acepto las politicas de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
