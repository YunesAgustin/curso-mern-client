import React from 'react';
import { List, Button, Icon, Modal, notification } from 'antd';
import { Link } from 'react-router-dom';
import { deletePostApi } from '../../../../api/post';
import { getAccessTokenApi } from '../../../../api/auth';

import './PostList.scss';

const { confirm } = Modal;

export default function PostList(props) {
  const { posts, setReloadPosts, editPost } = props;

  const deletePost = (post) => {
    const token = getAccessTokenApi();

    confirm({
      title: 'Eliminando post',
      content: `Estas seguro que deseas eliminar el post ${post.title}`,
      cancelText: 'Cancelar',
      okText: 'Eliminar',
      okType: 'danger',
      onOk() {
        deletePostApi(token, post._id)
          .then((response) => {
            if (response?.code === 200) {
              notification['success']({ message: response.message });
              setReloadPosts(true);
            } else {
              notification['error']({ message: response.message });
            }
          })
          .catch(() => {
            notification['error']({
              message: 'Error del servidor, intenete mas tarde.',
            });
          });
      },
    });
  };

  return (
    <div className="post-list">
      <List
        dataSource={posts.docs}
        renderItem={(post) => (
          <Post post={post} deletePost={deletePost} editPost={editPost} />
        )}
      />
    </div>
  );
}

function Post(props) {
  const { post, deletePost, editPost } = props;

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type="primary" target="_blank">
            <Icon type="eye" />
          </Button>
        </Link>,

        <Button type="primary" onClick={() => editPost(post)}>
          <Icon type="edit" />
        </Button>,
        <Button type="danger" onClick={() => deletePost(post)}>
          <Icon type="delete" />
        </Button>,
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  );
}
