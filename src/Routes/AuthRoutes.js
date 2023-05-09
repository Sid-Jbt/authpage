import AuthLayout from 'Components/AuthLayout';
import ForgotPassword from 'Screens/Auth/ForgotPassword';
import ResetPassword from 'Screens/Auth/ResetPassword';
import Login from 'Screens/Auth/Login';
import OrganisationSignup from 'Screens/Auth/OrganisationSignup';
import {
  defaultPattern,
  forgotPasswordPattern,
  organisationSignupPattern,
  resetPasswordPattern
} from './routeConfig';

const AuthRoutes = {
  path: defaultPattern,
  element: <AuthLayout />,
  children: [
    {
      index: true,
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
      path: organisationSignupPattern,
      element: <OrganisationSignup />
    }
  ]
};

export default AuthRoutes;
