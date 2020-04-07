import React, { useState, useEffect } from 'react';
import { Spin, List, notification } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import queryString from 'query-string';
import Pagination from '../../../Pagination';
import { getPostsApi } from '../../../../api/post';
import 'moment/locale/es';
import { Helmet } from 'react-helmet';

import './PostListWeb.scss';

export default function PostListWeb(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification['warning']({ message: response.message });
        } else {
          setPosts(response.posts);
        }
      })
      .catch(() => notification['error']({ message: 'Error del servidor.' }));
  }, [page]);

  if (!posts) {
    return (
      <Spin
        title="Cargando posts"
        style={{ width: '100%', padding: '200px 0' }}
      />
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog</title>
      </Helmet>
      <div className="post-list-web">
        <h1>Blog</h1>
        <List
          dataSource={posts.docs}
          renderItem={(post) => <Post post={post} />}
        />
        <Pagination posts={posts} location={location} history={history} />
      </div>
    </>
  );
}

function Post(props) {
  const { post } = props;
  console.log(post);
  const day = moment(post.date).format('DD');
  const month = moment(post.date).format('MMMM');
  //   const year = moment(post.date).format('YYYY');

  return (
    <List.Item className="post">
      <div className="post__date">
        <span>{day}</span>
        <span>{month}</span>
        {/* <span>{year}</span> */}
      </div>
      <Link to={`blog/${post.url}`}>
        <List.Item.Meta title={post.title} />
      </Link>
    </List.Item>
  );
}
