import Layout from './Layout';
import Home from './Home';

const PATH = '/';

export default [
  {
    path:PATH,
    component: Home,
    layout : Layout,
    exact: true,
  },
]
