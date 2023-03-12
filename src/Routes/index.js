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
      path: reportPattern,
      element: <Navigate to={allReportPattern} />
    }
  ]);
}
