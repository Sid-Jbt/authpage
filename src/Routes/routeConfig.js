import { generatePath } from 'react-router';

export const defaultPattern = '/';
export const getDefaultPattern = () => generatePath(defaultPattern);

export const loginPattern = '/login';
export const getLoginPattern = () => generatePath(loginPattern);

export const dashboardPattern = '/dashboard';
export const getDashboard = () => generatePath(dashboardPattern);

export const forgotPasswordPattern = '/forgot-password';
export const getForgotPasswordPattern = () => generatePath(forgotPasswordPattern);

export const resetPasswordPattern = '/reset-password';
export const getResetPasswordPattern = () => generatePath(resetPasswordPattern);

export const profilePattern = '/profile';
export const getProfilePattern = () => generatePath(profilePattern);

export const errorPattern = '/error';

export const employeeListPattern = '/employee-list';
export const getEmployeeListPattern = () => generatePath(employeeListPattern);
