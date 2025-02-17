import React from 'react';
import Logo from '../../../assets/img/logo.png';

import './MenuTop.scss';
import { Button, Icon } from 'antd';
import { logout } from '../../../api/auth';

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menuTop">
      <div className="menuTopLeft">
        <img className="menuTopLeftLogo" src={Logo} alt="Agustin Yunes" />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          <Icon type={menuCollapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
      </div>
      <div className="menuTopRight">
        <Button type="link" onClick={logoutUser}>
          <Icon type="poweroff" />
        </Button>
      </div>
    </div>
  );
}
