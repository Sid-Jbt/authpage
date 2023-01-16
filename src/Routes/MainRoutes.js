import {
  CurrencyRupeeOutlined,
  DashboardRounded,
  ErrorRounded,
  PeopleRounded
} from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { profilePattern, errorPattern, employeeListPattern, expensePattern } from './routeConfig';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const Error404 = Loadable(lazy(() => import('../Screens/Error404')));
const EmployeeList = Loadable(lazy(() => import('../Screens/EmployeeList')));
const Expense = Loadable(lazy(() => import('../Screens/Expense')));

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
  },
  {
    name: 'Error',
    icon: <ErrorRounded />,
    path: errorPattern,
    key: 'error',
    element: <Error404 />
  },
  {
    name: 'Employee',
    icon: <PeopleRounded />,
    path: employeeListPattern,
    key: 'employeeList',
    element: <EmployeeList />
  },
  {
    name: 'Expense',
    icon: <CurrencyRupeeOutlined />,
    path: expensePattern,
    key: 'expenses',
    element: <Expense />
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
