import AuthLayout from 'Components/AuthLayout';
import ForgotPassword from 'Screens/Auth/ForgotPassword';
import ResetPassword from 'Screens/Auth/ResetPassword';
import Login from 'Screens/Auth/Login';
import DashboardDefault from 'Screens/DashboardDefault';
// eslint-disable-next-line import/named
import {
  defaultPattern,
  forgotPasswordPattern,
  resetPasswordPattern,
  dashboardPattern
} from './routeConfig';

const AuthRoutes = {
  path: defaultPattern,
  element: <AuthLayout />,
  children: [
    {
      path: defaultPattern,
      element: <Login />
    },
    {
      path: forgotPasswordPattern,
      element: <ForgotPassword />
    },
    {
      path: resetPasswordPattern,
      element: <ResetPassword />
    },
    {
      path: dashboardPattern,
      element: <DashboardDefault />
    }
    // {
    //   path: '/forgot-reset-password',
    //   element: <ForgotResetPassword />
    // }
  ]
};

export default AuthRoutes;
