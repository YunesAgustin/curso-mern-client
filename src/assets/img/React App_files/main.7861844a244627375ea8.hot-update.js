webpackHotUpdate("main",{

/***/ "./src/pages/Admin/Blog/Blog.js":
/*!**************************************!*\
  !*** ./src/pages/Admin/Blog/Blog.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../components/Modal */ "./src/components/Modal/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Blog_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Blog.scss */ "./src/pages/Admin/Blog/Blog.scss");
/* harmony import */ var _Blog_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_Blog_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _api_post__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../api/post */ "./src/api/post.js");
var _jsxFileName = "/Users/YunesA/Documents/Curso MERN/client/src/pages/Admin/Blog/Blog.js";








function Blog(props) {
  const {
    location,
    history
  } = props;
  const [posts, setPosts] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [modalTitle, setModalTitle] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('');
  const [isVisbleModal, setIsVisbleModal] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const [modalContent, setModalContent] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const [reloadPosts, setReloadPosts] = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  const {
    page = 1
  } = query_string__WEBPACK_IMPORTED_MODULE_4___default.a.parse(location.search); // Obtiene el page para pasarlo despues a la peticion del back

  console.log(posts);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    Object(_api_post__WEBPACK_IMPORTED_MODULE_6__["getPostsApi"])(12, page).then(response => {
      if ((response === null || response === void 0 ? void 0 : response.code) !== 200) {
        antd__WEBPACK_IMPORTED_MODULE_1__["notification"]['warning']({
          message: response.message
        });
      } else {
        setPosts(response.posts);
      } // El ? sirve para si code existe entra al if sino ni compara

    }).catch(() => {
      antd__WEBPACK_IMPORTED_MODULE_1__["notification"]['error']({
        message: 'Error del servidor.'
      });
    });
    setReloadPosts(false);
  }, [page, reloadPosts]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "blog",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35,
      columnNumber: 5
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "blog__add-post",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36,
      columnNumber: 7
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    type: "primary",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37,
      columnNumber: 9
    }
  }, "Nuevo Post")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }
  }, "Post list"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40,
      columnNumber: 7
    }
  }, "paginacion.."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Modal__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: modalTitle,
    isVisible: isVisbleModal,
    setIstVisible: setIsVisbleModal,
    width: "75%",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }
  }));
}

/* harmony default export */ __webpack_exports__["default"] = (Object(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["withRouter"])(Blog)); // Es para poder obtener el nro de paginacion q se le pasa en la url

/***/ })

})
//# sourceMappingURL=main.7861844a244627375ea8.hot-update.js.map