import {
  PolicyRounded,
  Person,
  ErrorRounded,
  TvRounded,
  PeopleRounded,
  CurrencyRupee,
  DateRangeTwoTone
} from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import {
  profilePattern,
  privacyPolicyPattern,
  errorPattern,
  dashboardPattern,
  employeeListPattern,
  expensePattern,
  attendancePattern
} from './routeConfig';
import colors from '../Theme/base/colors';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));
const Error404 = Loadable(lazy(() => import('../Screens/Error404')));
const EmployeeList = Loadable(lazy(() => import('../Screens/EmployeeList')));
const Expense = Loadable(lazy(() => import('../Screens/Expense')));
const Attendance = Loadable(lazy(() => import('../Screens/Attendance')));

const MainRoutes = [
  {
    name: 'Dashboard',
    icon: (
      <TvRounded
        sx={{
          color: colors.primary.main
        }}
      />
    ),
    path: dashboardPattern,
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
    name: 'Privacy Policy',
    icon: (
      <PolicyRounded
        sx={{
          color: colors.black.light
        }}
      />
    ),
    path: privacyPolicyPattern,
    key: 'privacy',
    element: <PrivacyPolicy />
  },
  {
    name: 'Error',
    icon: <ErrorRounded sx={{ color: colors.error.main }} />,
    path: errorPattern,
    key: 'error',
    element: <Error404 />
  },
  {
    name: 'Employee',
    icon: <PeopleRounded />,
    path: employeeListPattern,
    key: 'employee',
    element: <EmployeeList />
  },
  {
    name: 'Expense',
    icon: <CurrencyRupee />,
    path: expensePattern,
    key: 'expense',
    element: <Expense />
  },
  {
    name: 'Attendance',
    icon: <DateRangeTwoTone sx={{ color: colors.primary.main }} />,
    path: attendancePattern,
    key: 'attendance',
    element: <Attendance />
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
