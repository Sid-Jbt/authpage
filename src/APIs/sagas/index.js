import { all } from 'redux-saga/effects';
import { getDashboardWatcher } from './dashboard';
import { getForgotPasswordWatcher } from './forgotPassword';
import { getLoginWatcher } from './login';
import { getOrganisationSignupWatcher } from './organisationSignup';
import { getProfileUpdateWatcher } from './profileUpdate';
import { getResetPasswordWatcher } from './resetPassword';
import { getDomainWatcher } from './getDomain';
import { getEmployeeAddWatcher } from './employee/employeeAdd';
import { getEmployeeListWatcher } from './employee/employeeList';
import { getEmployeeBySlugWatcher } from './employee/employeeBySlug';
import { getEmployeeUpdateWatcher } from './employee/employeeUpdate';
import { getEmployeeDeleteWatcher } from './employee/employeeDelete';
import { getEmployeeDisableWatcher } from './employee/employeeDisable';
import { getEmployeeChangePasswordWatcher } from './employee/employeeChangePassword';
import { getLeaveAddUpdateWatcher } from './leave/leaveAddUpdate';
import { getLeaveListWatcher } from './leave/leaveList';
import { getLeaveDeleteWatcher } from './leave/leaveDelete';
import { getLeaveReasonWatcher } from './leave/leaveReason';
import { getLeaveByIdWatcher } from './leave/leaveById';
import { getExpenseAddUpdateWatcher } from './expense/expenseAddUpdate';
import { getExpenseListWatcher } from './expense/expenseList';
import { getExpenseDeleteWatcher } from './expense/expenseDelete';
import { getExpenseByIdWatcher } from './expense/expenseByID';
import { getExpenseReasonWatcher } from './expense/expenseReason';
import { getProfileSetupWatcher } from './profileSetup';
import { getPayslipListWatcher } from './payslip/payslipList';
import { getAttendanceListWatcher } from './attendance/attendanceList';
import { getSupportAddUpdateWatcher } from './supportTicket/supportAddUpdate';
import { getSupportListWatcher } from './supportTicket/supportList';
import { getSupportByIdWatcher } from './supportTicket/supportById';
import { getSupportDeleteWatcher } from './supportTicket/supportDelete';
import { getSupportReasonWatcher } from './supportTicket/supportReason';
import { getHolidayListWatcher } from './holiday/holidayList';
import { getHolidayAddUpdateWatcher } from './holiday/holidayAddUpdate';
import { getHolidayByIdWatcher } from './holiday/holidayById';
import { getHolidayDeleteWatcher } from './holiday/holidayDelete';
import { getChangePasswordWatcher } from './settings/changePassword';
import { getRoleListWatcher } from './uac/roleList';
import { getRolesWatcher } from './uac/roles';
import { getRoleAddWatcher } from './uac/roleAdd';
import { getRoleUpdateWatcher } from './uac/roleUpdate';
import { getRoleByIdWatcher } from './uac/roleById';
import { getModuleListWatcher } from './uac/moduleList';
import { getTimeActivityReportListWatcher } from './reports/timeActivityReportList';
import { getTimeActivityByIdWatcher } from './reports/timeActivityById';

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
    getEmployeeUpdateWatcher(),
    getEmployeeDeleteWatcher(),
    getEmployeeDisableWatcher(),
    getEmployeeChangePasswordWatcher(),
    getExpenseAddUpdateWatcher(),
    getExpenseListWatcher(),
    getExpenseDeleteWatcher(),
    getExpenseByIdWatcher(),
    getExpenseReasonWatcher(),
    getPayslipListWatcher(),
    getAttendanceListWatcher(),
    getSupportAddUpdateWatcher(),
    getSupportListWatcher(),
    getSupportByIdWatcher(),
    getSupportDeleteWatcher(),
    getSupportReasonWatcher(),
    getHolidayListWatcher(),
    getHolidayAddUpdateWatcher(),
    getHolidayByIdWatcher(),
    getHolidayDeleteWatcher(),
    getChangePasswordWatcher(),
    getLeaveAddUpdateWatcher(),
    getLeaveListWatcher(),
    getLeaveDeleteWatcher(),
    getLeaveReasonWatcher(),
    getLeaveByIdWatcher(),
    getRoleListWatcher(),
    getRolesWatcher(),
    getRoleAddWatcher(),
    getRoleUpdateWatcher(),
    getRoleByIdWatcher(),
    getModuleListWatcher(),
    getTimeActivityReportListWatcher(),
    getTimeActivityByIdWatcher()
  ]);
}
