import { createBrowserRouter } from 'react-router';

// Public pages
import Layout from './pages/layout';
import Home from './pages/home';
import Portfolio from './pages/portfolio';
import PortfolioDetail from './pages/portfolio-detail';
import Servicos from './pages/servicos';
import Sobre from './pages/sobre';
import Contato from './pages/contato';
import Diagnostico from './pages/diagnostico';
import DesignSystem from './pages/design-system';
import NotFound from './pages/not-found';

// Auth pages
import Login from './pages/login';
import Setup from './pages/setup';

// Admin pages
import AdminLayout from './pages/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import PortfolioList from './pages/admin/portfolio-list';
import PortfolioForm from './pages/admin/portfolio-form';
import AdminMedia from './pages/admin/media';
import AdminUsers from './pages/admin/users';
import AdminSettings from './pages/admin/settings';
import Mensagens from './pages/admin/mensagens';

// Router v2.1
export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'portfolio', Component: Portfolio },
      { path: 'portfolio/:slug', Component: PortfolioDetail },
      { path: 'servicos', Component: Servicos },
      { path: 'sobre', Component: Sobre },
      { path: 'contato', Component: Contato },
      { path: 'diagnostico', Component: Diagnostico },
      { path: 'design-system', Component: DesignSystem },
    ],
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/setup',
    Component: Setup,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: 'portfolio', Component: PortfolioList },
      { path: 'portfolio/new', Component: PortfolioForm },
      { path: 'portfolio/edit/:id', Component: PortfolioForm },
      { path: 'media', Component: AdminMedia },
      { path: 'users', Component: AdminUsers },
      { path: 'settings', Component: AdminSettings },
      { path: 'mensagens', Component: Mensagens },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);