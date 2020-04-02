import React from 'react';
import SocialLinks from '../../SocialLinks';
import Logo from '../../../../assets/img/logo.png';

import './MyInfo.scss';

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={Logo} alt="Agustin" />
      <h4>Haciendo el curso</h4>
      <SocialLinks />
    </div>
  );
}
