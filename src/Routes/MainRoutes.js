import {
  PolicyRounded,
  Person,
  ErrorRounded,
  TvRounded,
  PeopleRounded,
  CurrencyRupee,
  DirectionsRun,
  PaymentRounded,
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
  payslipPattern,
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
const Payslip = Loadable(lazy(() => import('../Screens/Payslip')));
const Setting = Loadable(lazy(() => import('../Screens/Settings')));
const Attendance = Loadable(lazy(() => import('../Screens/Attendance')));

const MainRoutes = [
  {
    type: 'collapse',
    noCollapse: true,
    route: dashboardPattern,
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
    type: 'collapse',
    noCollapse: true,
    route: employeeListPattern,
    name: 'Employee',
    icon: <PeopleRounded sx={{ color: colors.primary.main }} />,
    path: employeeListPattern,
    key: 'employee',
    element: <EmployeeList />
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: expensePattern,
    name: 'Expense',
    icon: <CurrencyRupee sx={{ color: '#DAA520' }} />,
    path: expensePattern,
    key: 'expense',
    element: <Expense />
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: leavePattern,
    name: 'Leave',
    icon: <DirectionsRun />,
    path: leavePattern,
    key: 'leave',
    element: <LeaveList />
  },
  {
    type: 'unroute',
    noCollapse: true,
    route: settingPattern,
    name: 'Settings',
    icon: <SettingsRounded />,
    path: settingPattern,
    key: 'settings',
    element: <Setting />
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: payslipPattern,
    name: 'Payslip',
    icon: <PaymentRounded sx={{ color: colors.success.main }} />,
    path: payslipPattern,
    key: 'payslip',
    element: <Payslip />
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: attendancePattern,
    name: 'Attendance',
    icon: <DateRangeTwoTone sx={{ color: colors.primary.main }} />,
    path: attendancePattern,
    key: 'attendance',
    element: <Attendance />
  },
  { type: 'title', title: 'Testing Pages', key: 'testing-pages' },
  {
    type: 'collapse',
    name: 'Testing',
    key: 'time',
    icon: <CurrencyRupee sx={{ color: '#DAA520' }} />,
    children: [
      {
        name: 'Analytics',
        key: 'leave',
        path: '/time/leave',
        route: '/time/leave',
        element: <LeaveList />
      },
      {
        name: 'Sales',
        key: 'expense',
        path: '/time/expense',
        route: '/time/expense',
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
