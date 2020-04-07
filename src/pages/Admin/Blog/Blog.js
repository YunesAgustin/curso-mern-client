import React, { useState, useEffect } from 'react';
import { Button, notification, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { getPostsApi } from '../../../api/post';
import Modal from '../../../components/Modal';
import queryString from 'query-string';
import PostList from '../../../components/Admin/Blog/PostList';
import Pagination from '../../../components/Pagination';
import PostForm from '../../../components/Admin/Blog/PostForm';

import './Blog.scss';

function Blog(props) {
  const { location, history } = props;
  const [posts, setPosts] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [reloadPosts, setReloadPosts] = useState(false);
  const { page = 1 } = queryString.parse(location.search); // Obtiene el page para pasarlo despues a la peticion del back

  useEffect(() => {
    getPostsApi(12, page)
      .then((response) => {
        if (response?.code !== 200) {
          notification['warning']({ message: response.message });
        } else {
          setPosts(response.posts);
        } // El ? sirve para si code existe entra al if sino ni compara
      })
      .catch(() => {
        notification['error']({ message: 'Error del servidor.' });
      });
    setReloadPosts(false);
  }, [page, reloadPosts]);

  const addPost = () => {
    setIsVisibleModal(true);
    setModalTitle('Creando un nuevo post.');
    setModalContent(
      <PostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={null}
      />
    );
  };

  const editPost = (post) => {
    setIsVisibleModal(true);
    setModalTitle('Editando post.');
    setModalContent(
      <PostForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadPosts={setReloadPosts}
        post={post}
      />
    );
  };

  if (!posts) {
    return null;
  }
  return (
    <div className="blog">
      <div className="blog__add-post">
        <Button type="primary" onClick={addPost}>
          Nuevo Post
        </Button>
      </div>

      <PostList
        posts={posts}
        setReloadPosts={setReloadPosts}
        editPost={editPost}
      />

      <Pagination posts={posts} location={location} history={history} />

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
        width="75%"
      >
        {modalContent}
      </Modal>
    </div>
  );
}

export default withRouter(Blog); // Es para poder obtener el nro de paginacion q se le pasa en la url
