import Loadable from 'Elements/Loadable';
import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './MainRoutes';
import {
  allReportPattern,
  defaultPattern,
  errorPattern,
  loginPattern,
  personalProfilePattern,
  profilePattern,
  reportPattern
} from './routeConfig';

const Error404 = Loadable(lazy(() => import('../Screens/Error404')));

export default function RootRoutes() {
  return useRoutes([
    AuthRoutes,
    DashboardRoutes(),
    {
      path: errorPattern,
      element: <Error404 />
    },
    {
      path: loginPattern,
      element: <Navigate to={defaultPattern} />
    },
    {
      path: profilePattern,
      element: <Navigate to={personalProfilePattern} />
    },
    {
      path: reportPattern,
      element: <Navigate to={allReportPattern} />
    }
  ]);
}
