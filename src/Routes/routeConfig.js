import { generatePath } from 'react-router';

export const defaultPattern = '/';
export const getDefaultPattern = () => generatePath(defaultPattern);

export const loginPattern = '/login';
export const getLoginPattern = () => generatePath(loginPattern);

export const dashboardPattern = '/dashboard';
export const forgotPasswordPattern = '/forgot-password';
export const resetPasswordPattern = '/reset-password';
export const getForgotPasswordPattern = () => generatePath(forgotPasswordPattern);

export const profilePattern = '/profile';
export const privacyPolicyPattern = '/privacy-policy';
export const getProfilePattern = () => generatePath(profilePattern);
