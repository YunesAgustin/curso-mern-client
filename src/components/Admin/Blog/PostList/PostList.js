import React from 'react';
import { List, Button, Icon, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';

import './PostList.scss';

const { confirm } = Modal;

export default function PostList(props) {
  const { posts } = props;
  return (
    <div className="post-list">
      <List
        dataSource={posts.docs}
        renderItem={(post) => <Post post={post} />}
      />
    </div>
  );
}

function Post(props) {
  const { post } = props;

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type="primary" target="_blank">
            <Icon type="eye" />
          </Button>
        </Link>,

        <Button type="primary">
          <Icon type="edit" />
        </Button>,
        <Button type="danger">
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
}
