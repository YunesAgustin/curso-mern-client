import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { getMenuApi } from '../../../api/menu';
import LogoWhite from '../../../assets/img/logo.png';
import SocialLinks from '../SocialLinks';

import './MenuTop.scss';
export default function MenuTop() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuApi().then(response => {
      //Filtro solo los activos, tambien se podria crear otro endPoint enviando por parametro
      const arrayMenu = [];
      response.menu.forEach(item => {
        item.active && arrayMenu.push(item);
      });
      setMenuData(arrayMenu);
    });
  }, [menuData]);

  return (
    <Menu className="menu-top" mode="horizontal">
      <Menu.Item className="menu-top__logo">
        <Link to={'/'}>
          <img src={LogoWhite} alt="Agustin" />
        </Link>
      </Menu.Item>

      {menuData.map(item => {
        const external = item.url.indexOf('http') > -1 ? true : false; //Para saber si la ruta es externa o interna

        if (external) {
          return (
            <Menu.Item key={item._id} className="menu-top__item">
              {/* Para redireccionar rutas externas no se puede usar link por eso las diferencio */}
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </Menu.Item>
          );
        }
        return (
          <Menu.Item key={item._id} className="menu-top__item">
            <Link to={item.url}>{item.title}</Link>
          </Menu.Item>
        );
      })}

      <SocialLinks />
    </Menu>
  );
}
