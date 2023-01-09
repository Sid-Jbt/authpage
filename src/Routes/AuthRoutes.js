import AuthLayout from 'Components/AuthLayout';
import ForgotPassword from 'Screens/Auth/ForgotPassword';
import Login from 'Screens/Auth/Login';
// eslint-disable-next-line import/named
import { defaultPattern, forgotPasswordPattern } from './routeConfig';

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
    }
    // {
    //   path: '/forgot-reset-password',
    //   element: <ForgotResetPassword />
    // }
  ]
};

export default AuthRoutes;
