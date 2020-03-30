import React, { useState, useEffect } from 'react';
import {
  Switch,
  List,
  Icon,
  Modal as ModalAntd,
  Button,
  notification
} from 'antd';
import Modal from '../../../Modal';
import DragSortableList from 'react-drag-sortable';
import { updateMenuApi } from '../../../../api/menu';
import { getAccessTokenApi } from '../../../../api/auth';
import AddMenuWebForm from '../AddMenuWebForm';
import EditMenuWebForm from '../EditMenuWebForm';

import './MenuWebList.scss';
const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTile, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    // Hago esto para poder usarlos en el componente dragSortable..
    const listItemsArray = [];

    menu.forEach(item => {
      listItemsArray.push({
        content: (
          <MenuItem
            item={item}
            activateMenu={activateMenu}
            editMenuWebModal={editMenuWebModal}
            deleteMenu={deleteMenu}
          />
        )
      });
    });
    setListItems(listItemsArray);
  }, [menu]);

  const activateMenu = (menu, status) => {
    const token = getAccessTokenApi();

    updateMenuApi(token, menu._id, { active: status }).then(response => {
      notification['success']({ message: response });
    });
  };

  const onSort = (sortedList, event) => {
    const token = getAccessTokenApi();

    sortedList.forEach(item => {
      const id = item.content.props.item._id;
      const order = item.rank;

      updateMenuApi(token, id, { order });
    });
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando nuevo menu');
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };

  const editMenuWebModal = menu => {
    setIsVisibleModal(true);
    setModalTitle(`Editando menú ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menu={menu}
      />
    );
  };

  const deleteMenu = menu => {
    const token = getAccessTokenApi();
    const menuId = menu._id;

    updateMenuApi(token, menuId, { deleteLogic: true })
      .then(response => {
        notification['success']({ message: response });
        setReloadMenuWeb(true);
      })
      .catch(() => {
        ['error']({ message: 'Error del servidor' });
      });
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>
          Crear Menú
        </Button>
      </div>

      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>

      <Modal
        title={modalTile}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function MenuItem(props) {
  const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={e => activateMenu(item, e)}
        />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deleteMenu(item)}>
          <Icon type="delete" />
        </Button>
      ]}
    >
      <List.Item.Meta
        title={item.title}
        description={item.url}
      ></List.Item.Meta>
    </List.Item>
  );
}
