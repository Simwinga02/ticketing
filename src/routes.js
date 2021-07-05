import { Navigate } from 'react-router-dom/';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Faults from 'src/pages/allfaults';
import AccountDetails from 'src/pages/AccountDetails';
import Tickets from './pages/Tickets';
import CreateTicket from './pages/CreateTicket';
import ViewTicket from './pages/ViewTicket';

const routes = () => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'tickets', element: <Tickets /> },
      { path: 'accountdetails', element: <AccountDetails /> },
      { path: 'faults', element: <Faults /> },
      { path: 'create', element: <CreateTicket /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'admin',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'accountdetails', element: <AccountDetails /> },
      { path: 'register', element: <Register /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: 'manager',
    element: <DashboardLayout />,
    children: [
      { path: 'tickets', element: <Tickets /> },
      { path: 'viewTicket/:id', element: <ViewTicket /> },
      { path: 'register', element: <Register /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Login /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
