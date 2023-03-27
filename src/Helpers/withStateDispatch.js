import {
  getOrganisationSignup,
  getLogin,
  getForgotPassword,
  getResetPassword,
  getProfileUpdate,
  getDashboard,
  getEmployeeAdd,
  getEmployeeList,
  getEmployeeBySlug,
  getExpenseAddUpdate,
  getExpenseList,
  getExpenseDelete,
  getExpenseById,
  getExpenseReason,
  getLeaveAddUpdate,
  getLeaveList,
  getLeaveDelete,
  getLeaveReason,
  getLeaveById,
  getDomain,
  getProfileSetup,
  getPayslipList,
  getAttendanceList,
  getSupportAdd,
  getSupportList,
  getSupportUpdate,
  getSupportById,
  getSupportDelete,
  getSupportReason,
  getHolidayList,
  getHolidayAddUpdate,
  getHolidayById,
  getHolidayDelete,
  getChangePassword
} from 'APIs/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  Loading: state.loader.loading,
  DashboardData: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  GetProfileSetup: (data, resolve, reject) => dispatch(getProfileSetup(data, resolve, reject)),
  GetProfileUpdate: (data, resolve, reject) => dispatch(getProfileUpdate(data, resolve, reject)),
  GetDashboard: (data, resolve, reject) => dispatch(getDashboard(data, resolve, reject)),
  GetEmployeeAdd: (data, resolve, reject) => dispatch(getEmployeeAdd(data, resolve, reject)),
  GetEmployeeList: (data, resolve, reject) => dispatch(getEmployeeList(data, resolve, reject)),
  GetEmployeeBySlug: (data, resolve, reject) => dispatch(getEmployeeBySlug(data, resolve, reject)),
  GetExpenseAddUpdate: (data, resolve, reject) =>
    dispatch(getExpenseAddUpdate(data, resolve, reject)),
  GetExpenseList: (data, resolve, reject) => dispatch(getExpenseList(data, resolve, reject)),
  GetExpenseDelete: (data, resolve, reject) => dispatch(getExpenseDelete(data, resolve, reject)),
  GetExpenseReason: (data, resolve, reject) => dispatch(getExpenseReason(data, resolve, reject)),
  GetExpenseById: (data, resolve, reject) => dispatch(getExpenseById(data, resolve, reject)),
  GetPayslipList: (data, resolve, reject) => dispatch(getPayslipList(data, resolve, reject)),
  GetAttendanceList: (data, resolve, reject) => dispatch(getAttendanceList(data, resolve, reject)),
  GetSupportAdd: (data, resolve, reject) => dispatch(getSupportAdd(data, resolve, reject)),
  GetSupportList: (data, resolve, reject) => dispatch(getSupportList(data, resolve, reject)),
  GetSupportUpdate: (data, resolve, reject) => dispatch(getSupportUpdate(data, resolve, reject)),
  GetSupportById: (data, resolve, reject) => dispatch(getSupportById(data, resolve, reject)),
  GetSupportDelete: (data, resolve, reject) => dispatch(getSupportDelete(data, resolve, reject)),
  GetSupportReason: (data, resolve, reject) => dispatch(getSupportReason(data, resolve, reject)),
  GetHolidayList: (data, resolve, reject) => dispatch(getHolidayList(data, resolve, reject)),
  GetHolidayAddUpdate: (data, resolve, reject) =>
    dispatch(getHolidayAddUpdate(data, resolve, reject)),
  GetHolidayById: (data, resolve, reject) => dispatch(getHolidayById(data, resolve, reject)),
  GetHolidayDelete: (data, resolve, reject) => dispatch(getHolidayDelete(data, resolve, reject)),
  GetChangePassword: (data, resolve, reject) => dispatch(getChangePassword(data, resolve, reject)),
  GetLeaveAddUpdate: (data, resolve, reject) => dispatch(getLeaveAddUpdate(data, resolve, reject)),
  GetLeaveList: (data, resolve, reject) => dispatch(getLeaveList(data, resolve, reject)),
  GetLeaveDelete: (data, resolve, reject) => dispatch(getLeaveDelete(data, resolve, reject)),
  GetLeaveReason: (data, resolve, reject) => dispatch(getLeaveReason(data, resolve, reject)),
  GetLeaveById: (data, resolve, reject) => dispatch(getLeaveById(data, resolve, reject))
});

const mapDispatchToPropsAuth = (dispatch) => ({
  GetLogin: (data, resolve, reject) => dispatch(getLogin(data, resolve, reject)),
  GetForgotPassword: (data, resolve, reject) => dispatch(getForgotPassword(data, resolve, reject)),
  GetResetPassword: (data, resolve, reject) => dispatch(getResetPassword(data, resolve, reject)),
  GetOrganisationSignup: (data, resolve, reject) =>
    dispatch(getOrganisationSignup(data, resolve, reject)),
  GetDomain: (data, resolve, reject) => dispatch(getDomain(data, resolve, reject))
});

export const withStateDispatch = (WrappedComponent) =>
  connect(mapStateToProps, mapDispatchToProps)(WrappedComponent);
export const withStateDispatchAuth = (WrappedComponent) =>
  connect(mapStateToProps, mapDispatchToPropsAuth)(WrappedComponent);
