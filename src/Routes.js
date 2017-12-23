import Layout from './layouts/Layout';
import Home from './pages/Home';
const PATH = '/';

export default [
  {
    path:PATH,
    component: Home,
    layout : Layout,
    exact: true,
  },
]
