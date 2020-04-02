import React, { useState } from 'react';
import { Form, Icon, Input, Button, notification } from 'antd';
import { subscribeNewsletterApi } from '../../../api/newsletter';

import './Newsletter.scss';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    // eslint-disable-next-line
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const resultEmailValidation = emailValid.test(email);

    if (!resultEmailValidation) {
      notification['error']({ message: 'El email no es valido.' });
    } else {
      subscribeNewsletterApi(email).then(response => {
        if (response.code !== 200) {
          notification['warning']({ message: response.message });
        } else {
          notification['success']({ message: response.message });
          setEmail('');
        }
      });
    }
  };
  return (
    <div className="newsletter">
      <h3>Newsletter</h3>
      <Form className="newsletter__form" onSubmit={onSubmit}>
        <Form.Item>
          <Input
            prefix={
              <Icon type="user" style={{ color: 'rgba(0, 0, 0, 0.25)' }} />
            }
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form__button"
          >
            Subscribirme
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
