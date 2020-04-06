import React from 'react';
import { Pagination as PaginationAntd } from 'antd';

import './Pagination.scss';
export default function Pagination(props) {
  const { posts, location, history } = props;
  const currentPage = parseInt(posts.page); // Hay que convertirlo porque es un string

  const onChangePage = (newPage) => {
    console.log(newPage);
    history.push(`${location.pathname}?page=${newPage}`);
  };
  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={posts.total} //El total de posts
      pageSize={posts.limit} //El limite por page
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
    />
  );
}
