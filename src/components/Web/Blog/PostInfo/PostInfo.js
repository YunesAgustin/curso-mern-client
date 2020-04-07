import React, { useState, useEffect } from 'react';
import { getPostApi } from '../../../../api/post';
import { Spin, notification } from 'antd';
import moment from 'moment';
import 'moment/locale/es'; // Para usar el moment en español
import { Helmet } from 'react-helmet';

import './PostInfo.scss';

export default function PostInfo(props) {
  const { url } = props;
  const [post, setpost] = useState({});

  useEffect(() => {
    getPostApi(url)
      .then((response) => {
        if (response.code !== 200) {
          notification['warning']({ message: response.message });
        } else {
          setpost(response.post);
        }
      })
      .catch(() => {
        notification['error']({ message: 'Error del servidor.' });
      });
  }, [url]);

  if (!post) {
    return (
      <Spin
        title="Cargando post"
        style={{ width: '100%', padding: '200px 0' }}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <div className="post-info">
        <h1 className="post-info__title">{post.title}</h1>
        <div className="post-info__date">
          {moment(post.date).local('es').format('LL')}
        </div>
        <div
          className="post-info__description"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />
        {/* En la bd guardo todo el texto del post como html. Y de esta manera lo puedo mostrar */}
      </div>
    </>
  );
}
