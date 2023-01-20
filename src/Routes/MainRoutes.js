import {
  PolicyRounded,
  Person,
  ErrorRounded,
  TvRounded,
  PeopleRounded,
  CurrencyRupee,
  DirectionsRun,
  SettingsRounded,
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
  leavePattern,
  settingPattern,
  attendancePattern
} from './routeConfig';
import colors from '../Theme/base/colors';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));
const Error404 = Loadable(lazy(() => import('../Screens/Error404')));
const EmployeeList = Loadable(lazy(() => import('../Screens/EmployeeList')));
const Expense = Loadable(lazy(() => import('../Screens/Expense')));
const LeaveList = Loadable(lazy(() => import('../Screens/LeaveList')));
const Setting = Loadable(lazy(() => import('../Screens/Setting')));
const Attendance = Loadable(lazy(() => import('../Screens/Attendance')));

const MainRoutes = [
  {
    type: 'route',
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
    type: 'unroute',
    name: 'Profile',
    icon: <Person />,
    path: profilePattern,
    key: 'profile',
    element: <Profile />
  },
  {
    type: 'unroute',
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
    type: 'route',
    name: 'Employee',
    icon: <PeopleRounded sx={{ color: colors.primary.main }} />,
    path: employeeListPattern,
    key: 'employee',
    element: <EmployeeList />
  },
  {
    type: 'route',
    name: 'Expense',
    icon: <CurrencyRupee sx={{ color: '#DAA520' }} />,
    path: expensePattern,
    key: 'expense',
    element: <Expense />
  },
  {
    type: 'route',
    name: 'Leave',
    icon: <DirectionsRun />,
    path: leavePattern,
    key: 'leave',
    element: <LeaveList />
  },
  { type: 'title', title: 'Testing Pages', key: 'testing-pages' },
  {
    type: 'collapse',
    name: 'Dashboard',
    key: 'time',
    icon: <CurrencyRupee sx={{ color: '#DAA520' }} />,
    children: [
      {
        name: 'Analytics',
        key: 'analytics',
        path: '/time/leave',
        element: <LeaveList />
      },
      {
        name: 'Sales',
        key: 'sales',
        path: '/time/expense',
        element: <Expense />
      }
    ]
  },
  // Keep this route at the end to keep this flow ready
  {
    type: 'unroute',
    name: 'Error',
    icon: <ErrorRounded sx={{ color: colors.error.main }} />,
    path: errorPattern,
    key: 'error',
    element: <Error404 />
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
