export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API_URL = {
  LOGIN_URL: '/login',
  FORGOT_PASSWORD_URL: '/forgot-password',
  RESET_PASSWORD_URL: '/reset-forgot-password',
  ORGANISATION_SIGNUP_URL: '/admin/signup',
  DOMAIN_URL: '/check/domain',
  PROFIlE_SETUP_URL: '/profile-setup',
  PROFIlE_UPDATE_URL: '/profile',
  DASHBOARD_URL: '/dashboard',
  EMPLOYEE_LIST_URL: '/admin/user',
  EMPLOYEE_ADD_URL: '/user/signup',
  EMPLOYEE_BY_SLUG_URL: '/',
  SUPPORT_ADD_URL: '/user/support-ticket',
  SUPPORT_GET_URL: '/support-ticket/list',
  SUPPORT_UPDATE_URL: '/user/support-ticket',
  SUPPORT_BY_ID_URL: '/support-ticket',
  SUPPORT_DELETE_URL: '/user/support-ticket',
  PAYSLIP_LIST_URL: '/payslip/list',
  ATTENDANCE_LIST_URL: '/attendance/list'
};
