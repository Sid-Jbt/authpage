import { generatePath } from 'react-router';

export const defaultPattern = '/';
export const getDefaultPattern = () => generatePath(defaultPattern);

export const loginPattern = '/login';
export const getLoginPattern = () => generatePath(loginPattern);

export const dashboardPattern = '/dashboard';
export const getDashboardPattern = () => generatePath(dashboardPattern);

export const forgotPasswordPattern = '/forgot-password';
export const getForgotPasswordPattern = () => generatePath(forgotPasswordPattern);

export const resetPasswordPattern = '/reset-password';
export const getResetPasswordPattern = () => generatePath(resetPasswordPattern);

export const profilePattern = '/profile';
export const getProfilePattern = () => generatePath(profilePattern);

export const privacyPolicyPattern = '/privacy';
export const getPrivacyPolicyPattern = () => generatePath(privacyPolicyPattern);

export const errorPattern = '/error';
export const getErrorPattern = () => generatePath(errorPattern);

export const employeeListPattern = '/employee';
export const getEmployeeListPattern = () => generatePath(employeeListPattern);

export const expensePattern = '/expense';
export const getExpensePattern = () => generatePath(expensePattern);

export const attendancePattern = '/attendance';
export const getAttendancePattern = () => generatePath(attendancePattern);
