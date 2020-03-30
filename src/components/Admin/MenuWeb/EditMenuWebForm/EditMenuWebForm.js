import React, { useState, useEffect } from 'react';
import { Form, Input, Icon, Button, notification } from 'antd';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';

import './EditMenuWebForm.scss';

export default function EditMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb, menu } = props;
  const [menuWebData, setMenuWebData] = useState(menu);

  useEffect(() => {
    setMenuWebData(menu);
  }, [menu]);

  const editMenu = e => {
    e.preventDefault();
    console.log(menuWebData._id);

    if (!menuWebData.title || !menuWebData.url) {
      notification['error']({ message: 'Todos los campos son obligatorios.' });
    } else {
      const token = getAccessTokenApi();
      const menuId = menuWebData._id;

      updateMenuApi(token, menuId, menuWebData)
        .then(response => {
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          notification['success']({ message: response });
        })
        .catch(() => {
          notification['error']({ message: 'Error del servidor.' });
        });
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        menu={menu}
        editMenu={editMenu}
      />
    </div>
  );
}

function EditForm(props) {
  const { menuWebData, setMenuWebData, menu, editMenu } = props;

  return (
    <Form className="form-edit" onSubmit={editMenu}>
      <Form.Item>
        <Input
          prefix={<Icon type="font-size" />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={e =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          //   addonBefore={selectBefore}
          prefix={<Icon type="link" />}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="button-submit">
          Actualizar Menú
        </Button>
      </Form.Item>
    </Form>
  );
}
