import {
  CurrencyRupee,
  DateRangeTwoTone,
  DirectionsRun,
  HolidayVillage,
  ListAltTwoTone,
  PaymentRounded,
  PeopleRounded,
  Person,
  PolicyRounded,
  SettingsRounded,
  SupportAgent,
  TvRounded,
  VerifiedUserOutlined,
  ViewArrayOutlined
} from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import {
  allReportPattern,
  attendancePattern,
  dashboardPattern,
  employeeDetailsPattern,
  employeeListPattern,
  expensePattern,
  holidayPattern,
  leavePattern,
  payslipPattern,
  privacyPolicyPattern,
  profilePattern,
  profileSetupPattern,
  reportTimeActivityPattern,
  reportWeeklyLimitPattern,
  roleDetailsPattern,
  rolePattern,
  settingPattern,
  supportTicketPattern
} from './routeConfig';
import colors from '../Theme/base/colors';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const ProfileSetup = Loadable(lazy(() => import('../Screens/ProfileSetup')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));
const EmployeeList = Loadable(lazy(() => import('../Screens/Employee')));
const EmployeeDetails = Loadable(lazy(() => import('../Screens/Employee/EmployeeDetails')));
const Expense = Loadable(lazy(() => import('../Screens/Expense')));
const LeaveList = Loadable(lazy(() => import('../Screens/Leave')));
const Payslip = Loadable(lazy(() => import('../Screens/Payslip')));
const Setting = Loadable(lazy(() => import('../Screens/Settings')));
const Attendance = Loadable(lazy(() => import('../Screens/Attendance')));
const Holiday = Loadable(lazy(() => import('../Screens/Holiday')));
const SupportTicket = Loadable(lazy(() => import('../Screens/SupportTicket/index')));
const Role = Loadable(lazy(() => import('../Screens/Role')));
// const NoticeBoard = Loadable(lazy(() => import('../Screens/NoticeBoard')));
const AllReport = Loadable(lazy(() => import('../Screens/Reports/AllReports')));
const TimeActivity = Loadable(lazy(() => import('../Screens/Reports/TimeActivity')));
const WeeklyLimit = Loadable(lazy(() => import('../Screens/Reports/WeeklyLimit')));
const RoleDetails = Loadable(lazy(() => import('../Screens/Role/RoleDetails')));

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
    type: 'unroute',
    noCollapse: true,
    route: employeeDetailsPattern,
    name: 'Employee',
    icon: <PeopleRounded sx={{ color: colors.primary.main }} />,
    path: employeeDetailsPattern,
    key: 'employeeDetails',
    element: <EmployeeDetails />
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
  {
    type: 'collapse',
    noCollapse: true,
    route: rolePattern,
    name: 'Role',
    icon: <ViewArrayOutlined sx={{ color: colors.dark.main }} />,
    path: rolePattern,
    key: 'role',
    element: <Role />
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: supportTicketPattern,
    name: 'Support Ticket',
    icon: <SupportAgent sx={{ color: colors.secondary.main }} />,
    path: supportTicketPattern,
    key: 'supportTicket',
    element: <SupportTicket />
  },
  {
    type: 'collapse',
    name: 'Reports',
    key: 'reports',
    icon: <ListAltTwoTone sx={{ color: '#DAA520' }} />,
    children: [
      {
        name: 'All Reports',
        key: 'allReports',
        path: allReportPattern,
        route: allReportPattern,
        element: <AllReport />
      },
      {
        name: 'Time & Activity',
        key: 'timeActivity',
        path: reportTimeActivityPattern,
        route: reportTimeActivityPattern,
        element: <TimeActivity />
      },
      {
        name: 'Weekly Limit',
        key: 'weeklyLimit',
        path: reportWeeklyLimitPattern,
        route: reportWeeklyLimitPattern,
        element: <WeeklyLimit />
      }
    ]
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: holidayPattern,
    name: 'Holiday',
    icon: <HolidayVillage sx={{ color: '#DAA520' }} />,
    path: holidayPattern,
    key: 'holiday',
    element: <Holiday />
  },
  {
    type: 'unroute',
    noCollapse: true,
    name: 'Profile Setup',
    icon: <VerifiedUserOutlined sx={{ color: colors.error.main }} />,
    path: profileSetupPattern,
    route: profileSetupPattern,
    key: 'profileSetup',
    element: <ProfileSetup />
  },
  // {
  //   type: 'collapse',
  //   noCollapse: true,
  //   route: noticePattern,
  //   name: 'Notice & Event',
  //   icon: <AnnouncementRounded sx={{ color: colors.error.main }} />,
  //   path: noticePattern,
  //   key: 'notice',
  //   element: <NoticeBoard />
  // },
  {
    type: 'unroute',
    noCollapse: true,
    route: roleDetailsPattern,
    name: 'Role',
    icon: <PeopleRounded sx={{ color: colors.primary.main }} />,
    path: roleDetailsPattern,
    key: 'roleDetails',
    element: <RoleDetails />
  }
];

const Route = () => {
  const { roleList } = useSelector((state) => state.login);
  const childrenList = MainRoutes.filter(
    (item) =>
      roleList &&
      roleList[item.key] &&
      (roleList[item.key].r || roleList[item.key].w || roleList[item.key].d) &&
      roleList.hasOwnProperty(item.key)
  );

  return {
    path: '/',
    element: <DashboardLayout />,
    children: childrenList
  };
};

export default Route;
