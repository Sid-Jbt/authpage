import { useRoutes } from 'react-router';
import AuthRoutes from './AuthRoutes';
import DashboardRoutes from './MainRoutes';

export default function RootRoutes() {
  return useRoutes([AuthRoutes, DashboardRoutes]);
}
