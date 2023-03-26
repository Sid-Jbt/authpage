import { all } from 'redux-saga/effects';
import { getDashboardWatcher } from './dashboard';
import { getForgotPasswordWatcher } from './forgotPassword';
import { getLoginWatcher } from './login';
import { getOrganisationSignupWatcher } from './organisationSignup';
import { getProfileUpdateWatcher } from './profileUpdate';
import { getResetPasswordWatcher } from './resetPassword';
import { getEmployeeAddWatcher } from './employee/employeeAdd';
import { getEmployeeListWatcher } from './employee/employeeList';
import { getEmployeeBySlugWatcher } from './employee/employeeBySlug';
import { getLeaveAddUpdateWatcher } from './leave/leaveAddUpdate';
import { getLeaveListWatcher } from './leave/leaveList';
import { getLeaveDeleteWatcher } from './leave/leaveDelete';
import { getDomainWatcher } from './getDomain';
import { getProfileSetupWatcher } from './profileSetup';
import { getPayslipListWatcher } from './payslip/payslipList';
import { getAttendanceListWatcher } from './attendance/attendanceList';
import { getChangePasswordWatcher } from './settings/changePassword';
import { getLeaveReasonWatcher } from './leave/leaveReason';
import { getLeaveByIdWatcher } from './leave/leaveById';

export default function* rootSaga() {
  yield all([
    getLoginWatcher(),
    getOrganisationSignupWatcher(),
    getDomainWatcher(),
    getForgotPasswordWatcher(),
    getResetPasswordWatcher(),
    getProfileSetupWatcher(),
    getProfileUpdateWatcher(),
    getDashboardWatcher(),
    getEmployeeAddWatcher(),
    getEmployeeListWatcher(),
    getEmployeeBySlugWatcher(),
    getPayslipListWatcher(),
    getAttendanceListWatcher(),
    getChangePasswordWatcher(),
    getLeaveAddUpdateWatcher(),
    getLeaveListWatcher(),
    getLeaveDeleteWatcher(),
    getLeaveReasonWatcher(),
    getLeaveByIdWatcher()
  ]);
}
