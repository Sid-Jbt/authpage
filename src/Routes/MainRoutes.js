import {
  DashboardRounded,
  PolicyRounded,
  Person,
  ErrorRounded,
  PeopleRounded
} from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import {
  profilePattern,
  privacyPolicyPattern,
  errorPattern,
  employeeListPattern
} from './routeConfig';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));
const Error404 = Loadable(lazy(() => import('../Screens/Error404')));
const EmployeeList = Loadable(lazy(() => import('../Screens/EmployeeList')));

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
  },
  {
    name: 'Error',
    icon: <ErrorRounded />,
    path: errorPattern,
    key: 'error',
    element: <Error404 />
  },
  {
    name: 'EmployeeList',
    icon: <PeopleRounded />,
    path: employeeListPattern,
    key: 'employeeList',
    element: <EmployeeList />
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
