//Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

//Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
import Blog from '../pages/Blog';

//Admin Pages
import AdminHome from '../pages/Admin';
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';
import AdminMenuWeb from '../pages/Admin/MenuWeb';
import AdminCourses from '../pages/Admin/Courses';
import AdminBlog from '../pages/Admin/Blog';

// Others
import Error404 from '../pages/Error404';

const routes = [
  {
    path: '/admin',
    exact: false,

    component: LayoutAdmin,
    routes: [
      {
        path: '/admin',
        exact: true,
        component: AdminHome,
      },
      {
        path: '/admin/login',
        exact: true,
        component: AdminSignIn,
      },

      {
        path: '/admin/users',
        exact: true,
        component: AdminUsers,
      },
      {
        path: '/admin/menu',
        exact: true,
        component: AdminMenuWeb,
      },
      {
        path: '/admin/courses',
        exact: true,
        component: AdminCourses,
      },
      {
        path: '/admin/blog',
        exact: true,
        component: AdminBlog,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: '/',
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/cursos',
        exact: true,
        component: Courses,
      },
      {
        path: '/contact',
        exact: true,
        component: Contact,
      },
      {
        path: '/blog',
        exact: true,
        component: Blog,
      },
      {
        path: '/blog/:url', // Para entrar a cada post especifico, ya que c/u tiene una url distinta
        exact: true,
        component: Blog,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
