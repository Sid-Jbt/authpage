import { DashboardRounded } from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { profilePattern } from './routeConfig';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));

const MainRoutes = [
  {
    name: 'Dashboard',
    icon: <DashboardRounded />,
    path: '/dashboard',
    key: 'dashboard',
    element: <DashboardDefault />
  },
  {
    name: 'Profile',
    icon: <DashboardRounded />,
    path: profilePattern,
    key: 'profile',
    element: <Profile />
  }
];

// const roleList = ''; // for future if we need to config and show selected list in dashboard to user then we will store here from the local storage
const childrenList = MainRoutes; // filter of that role list according to the above mainRoutes using array filter method

const DashboardRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: childrenList
};

export default DashboardRoutes;
