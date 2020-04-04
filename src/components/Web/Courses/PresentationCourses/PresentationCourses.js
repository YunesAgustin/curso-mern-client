import React from 'react';
import AcademyLogo from '../../../../assets/img/academy.png';

import './PresentationCourses.scss';

export default function PresentatioCourses() {
  return (
    <div className="presentation-courses">
      <img src={AcademyLogo} alt="Cursos" />
      <p>
        A continuacion se listan unos cursitos que podemos encontrar en Udemy
      </p>
      <p>Aprovecha las ofertas!</p>
    </div>
  );
}
