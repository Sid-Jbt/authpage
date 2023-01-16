import { DashboardRounded, PolicyRounded, Person, ErrorRounded } from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { profilePattern, privacyPolicyPattern, errorPattern } from './routeConfig';
import colors from '../Theme/base/colors';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));
const Error404 = Loadable(lazy(() => import('../Screens/Error404')));

const MainRoutes = [
  {
    name: 'Dashboard',
    icon: (
      <DashboardRounded
        sx={{
          color: colors.gradients.primary.main
        }}
      />
    ),
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
    icon: (
      <PolicyRounded
        sx={{
          color: colors.black.light
        }}
      />
    ),
    path: privacyPolicyPattern,
    key: 'privacyPolicy',
    element: <PrivacyPolicy />
  },
  {
    name: 'Error',
    icon: <ErrorRounded sx={{ color: colors.error.main }} />,
    path: errorPattern,
    key: 'error',
    element: <Error404 />
  }
];

// const roleList = ''; // for future if we need to config and show selected list in dashboard to user then we will store here from the local storage
const childrenList = MainRoutes;
// filter of that role list according to the above mainRoutes using array filter method

const DashboardRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: childrenList
};

export default DashboardRoutes;
