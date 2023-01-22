import { generatePath } from 'react-router';

export const defaultPattern = '/';
export const getDefaultPattern = () => generatePath(defaultPattern);

export const loginPattern = '/login';
export const getLoginPattern = () => generatePath(loginPattern);

export const dashboardPattern = '/dashboard';
export const getDashboardPattern = () => generatePath(dashboardPattern);

export const timeSheetPattern = '/timesheet';
export const getTimeSheetPattern = () => generatePath(timeSheetPattern);

export const forgotPasswordPattern = '/forgot-password';
export const getForgotPasswordPattern = () => generatePath(forgotPasswordPattern);

export const resetPasswordPattern = '/reset-password';
export const getResetPasswordPattern = () => generatePath(resetPasswordPattern);

export const profilePattern = '/profile';
export const getProfilePattern = () => generatePath(profilePattern);

export const profileSetupPattern = '/profilesetup';
export const getProfileSetupPattern = () => generatePath(profileSetupPattern);

export const privacyPolicyPattern = '/privacy';
export const getPrivacyPolicyPattern = () => generatePath(privacyPolicyPattern);

export const errorPattern = '*';
export const getErrorPattern = () => generatePath(errorPattern);

export const employeeListPattern = '/employee';
export const getEmployeeListPattern = () => generatePath(employeeListPattern);

export const employeeDetailsPattern = '/employee/:id';
export const getEmployeeDetailsPattern = ({ id }) => generatePath(employeeListPattern, id);

export const expensePattern = '/expense';
export const getExpensePattern = () => generatePath(expensePattern);

export const leavePattern = '/leave';
export const getLeavePattern = () => generatePath(leavePattern);

export const settingsPattern = '/settings';
export const getSettingsPattern = () => generatePath(settingsPattern);

export const payslipPattern = '/payslip';
export const getPayslipPattern = () => generatePath(payslipPattern);
export const settingPattern = '/setting';
export const getSettingPattern = () => generatePath(settingPattern);

export const attendancePattern = '/attendance';
export const getAttendancePattern = () => generatePath(attendancePattern);

export const reportPattern = '/report';
export const getReportPattern = generatePath(reportPattern);

export const allReportPattern = `${reportPattern}/allreport`;
export const getAllReportPattern = generatePath(allReportPattern);
