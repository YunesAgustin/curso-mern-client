import React from 'react';
import { Modal as ModalAntd } from 'antd';

export default function Modal(props) {
  // Al recuperar una prop con ...other no tengo que especificar esa props que paso
  // si paso mas de la que estan especificadas la toma y la aplica
  // por ejemplo en el blog le paso width para hecer mas grande el modal
  const { children, title, isVisible, setIsVisible, ...other } = props;

  return (
    <ModalAntd
      title={title}
      centered
      visible={isVisible}
      onCancel={() => setIsVisible(false)}
      footer={false}
      {...other}
    >
      {children}
    </ModalAntd>
  );
}
