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
  getDomain,
  getProfileSetup,
  getPayslipList,
  getAttendanceList,
  getSupportAdd,
  getSupportList,
  getSupportUpdate,
  getSupportById,
  getSupportDelete,
  getSupportReason
} from 'APIs/actions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  Loading: state.loader.loading,
  DashboardData: state.dashboard
});

const mapDispatchToProps = (dispatch) => ({
  GetLogin: (data, resolve, reject) => dispatch(getLogin(data, resolve, reject)),
  GetForgotPassword: (data, resolve, reject) => dispatch(getForgotPassword(data, resolve, reject)),
  GetResetPassword: (data, resolve, reject) => dispatch(getResetPassword(data, resolve, reject)),
  GetOrganisationSignup: (data, resolve, reject) =>
    dispatch(getOrganisationSignup(data, resolve, reject)),
  GetDomain: (data, resolve, reject) => dispatch(getDomain(data, resolve, reject)),
  GetProfileSetup: (data, resolve, reject) => dispatch(getProfileSetup(data, resolve, reject)),
  GetProfileUpdate: (data, resolve, reject) => dispatch(getProfileUpdate(data, resolve, reject)),
  GetDashboard: (data, resolve, reject) => dispatch(getDashboard(data, resolve, reject)),
  GetEmployeeAdd: (data, resolve, reject) => dispatch(getEmployeeAdd(data, resolve, reject)),
  GetEmployeeList: (data, resolve, reject) => dispatch(getEmployeeList(data, resolve, reject)),
  GetEmployeeBySlug: (data, resolve, reject) => dispatch(getEmployeeBySlug(data, resolve, reject)),
  GetPayslipList: (data, resolve, reject) => dispatch(getPayslipList(data, resolve, reject)),
  GetAttendanceList: (data, resolve, reject) => dispatch(getAttendanceList(data, resolve, reject)),
  GetSupportAdd: (data, resolve, reject) => dispatch(getSupportAdd(data, resolve, reject)),
  GetSupportList: (data, resolve, reject) => dispatch(getSupportList(data, resolve, reject)),
  GetSupportUpdate: (data, resolve, reject) => dispatch(getSupportUpdate(data, resolve, reject)),
  GetSupportById: (data, resolve, reject) => dispatch(getSupportById(data, resolve, reject)),
  GetSupportDelete: (data, resolve, reject) => dispatch(getSupportDelete(data, resolve, reject)),
  GetSupportReason: (data, resolve, reject) => dispatch(getSupportReason(data, resolve, reject))
});

export default connect(mapStateToProps, mapDispatchToProps);
