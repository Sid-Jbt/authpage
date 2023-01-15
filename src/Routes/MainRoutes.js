import { DashboardRounded, PolicyRounded, Person } from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { profilePattern, privacyPolicyPattern } from './routeConfig';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));

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
    icon: <Person />,
    path: profilePattern,
    key: 'profile',
    element: <Profile />
  },
  {
    name: 'PrivacyPolicy',
    icon: <PolicyRounded />,
    path: privacyPolicyPattern,
    key: 'privacyPolicy',
    element: <PrivacyPolicy />
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
