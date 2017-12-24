import Layout from './layouts/Layout';
import Home from './pages/Home';
import EmailVerified from './pages/EmailVerified';
const PATH = '/';

export default [
  {
    path:PATH,
    component: Home,
    layout : Layout,
    exact: true,
  },
  {
    path:'/verified',
    component: EmailVerified,
    layout : undefined,
    exact: true,
  },
]
