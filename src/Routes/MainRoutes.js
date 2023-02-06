import {
  PolicyRounded,
  Person,
  TvRounded,
  PeopleRounded,
  CurrencyRupee,
  DirectionsRun,
  PaymentRounded,
  SettingsRounded,
  DateRangeTwoTone,
  ReportOutlined,
  ListAltTwoTone,
  VerifiedUserOutlined,
  HolidayVillage,
  ViewArrayOutlined,
  SupportAgent,
  AnnouncementRounded
} from '@mui/icons-material';
import DashboardLayout from 'Components/DashboardLayout';
import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
  profilePattern,
  privacyPolicyPattern,
  dashboardPattern,
  employeeListPattern,
  expensePattern,
  leavePattern,
  payslipPattern,
  settingPattern,
  attendancePattern,
  allReportPattern,
  reportPattern,
  profileSetupPattern,
  employeeDetailsPattern,
  holidayPattern,
  rolePattern,
  supportTicketPattern,
  noticePattern
} from './routeConfig';
import colors from '../Theme/base/colors';

const DashboardDefault = Loadable(lazy(() => import('../Screens/DashboardDefault')));
const Profile = Loadable(lazy(() => import('../Screens/Profile')));
const ProfileSetup = Loadable(lazy(() => import('../Screens/ProfileSetup')));
const PrivacyPolicy = Loadable(lazy(() => import('../Screens/PrivacyPolicy')));
const EmployeeList = Loadable(lazy(() => import('../Screens/Employee/EmployeeList')));
const EmployeeDeatils = Loadable(lazy(() => import('../Screens/Employee/EmployeeDetails')));
const Expense = Loadable(lazy(() => import('../Screens/Expense')));
const LeaveList = Loadable(lazy(() => import('../Screens/Leave')));
const Payslip = Loadable(lazy(() => import('../Screens/Payslip')));
const Setting = Loadable(lazy(() => import('../Screens/Settings')));
const Attendance = Loadable(lazy(() => import('../Screens/Attendance')));
const Holiday = Loadable(lazy(() => import('../Screens/Holiday')));
const SupportTicket = Loadable(lazy(() => import('../Screens/SupportTicket')));
const Role = Loadable(lazy(() => import('../Screens/Role')));
const NoticeBoard = Loadable(lazy(() => import('../Screens/NoticeBoard')));

// Report
const AllReport = Loadable(lazy(() => import('../Screens/Reports/AllReports')));
const TimeActivity = Loadable(lazy(() => import('../Screens/Reports/TimeActivity')));

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
    element: <EmployeeDeatils />
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
    key: 'report',
    icon: <ListAltTwoTone sx={{ color: '#DAA520' }} />,
    children: [
      {
        name: 'All Reports',
        key: 'allreport',
        path: allReportPattern,
        route: allReportPattern,
        element: <AllReport />
      },
      {
        name: 'Time & Activity',
        key: 'timeactivity',
        path: '/report/timeactivity',
        route: '/report/timeactivity',
        element: <TimeActivity />
      },
      {
        name: 'Weekly Limit',
        key: 'weeklylimit',
        path: '/report/weeklylimit',
        route: '/report/weeklylimit',
        element: <TimeActivity />
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
  // { type: 'title', title: 'Other Pages', key: 'other-pages' },
  {
    type: 'unroute',
    name: 'Reports',
    icon: <ReportOutlined sx={{ color: colors.error.main }} />,
    path: reportPattern,
    key: 'report',
    element: <Navigate to={allReportPattern} />
  },
  {
    type: 'unroute',
    noCollapse: true,
    name: 'Profile Setup',
    icon: <VerifiedUserOutlined sx={{ color: colors.error.main }} />,
    path: profileSetupPattern,
    route: profileSetupPattern,
    key: 'profilesetup',
    element: <ProfileSetup />
  },
  {
    type: 'collapse',
    noCollapse: true,
    route: noticePattern,
    name: 'Notice & Event',
    icon: <AnnouncementRounded sx={{ color: colors.error.main }} />,
    path: noticePattern,
    key: 'notice',
    element: <NoticeBoard />
  }
];

const Route = () => {
  const { roleList } = useSelector((state) => state.route);
  const childrenList = MainRoutes.filter((item) => roleList && roleList.includes(item.key));

  const DashboardRoutes = {
    path: '/',
    element: <DashboardLayout />,
    children: childrenList
  };

  return DashboardRoutes;
};

export default Route;
