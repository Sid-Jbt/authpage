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
import { getExpenseAddUpdateWatcher } from './expense/expenseAddUpdate';
import { getExpenseListWatcher } from './expense/expenseList';
import { getExpenseDeleteWatcher } from './expense/expenseDelete';
import { getExpenseByIdWatcher } from './expense/expenseByID';
import { getExpenseReasonWatcher } from './expense/expenseReason';
import { getProfileSetupWatcher } from './profileSetup';
import { getPayslipListWatcher } from './payslip/payslipList';
import { getAttendanceListWatcher } from './attendance/attendanceList';
import { getSupportAddWatcher } from './supportTicket/supportAdd';
import { getSupportListWatcher } from './supportTicket/supportList';
import { getSupportUpdateWatcher } from './supportTicket/supportUpdate';
import { getSupportByIdWatcher } from './supportTicket/supportById';
import { getSupportDeleteWatcher } from './supportTicket/supportDelete';
import { getSupportReasonWatcher } from './supportTicket/supportReason';
import { getHolidayListWatcher } from './holiday/holidayList';
import { getHolidayAddUpdateWatcher } from './holiday/holidayAddUpdate';
import { getHolidayByIdWatcher } from './holiday/holidayById';
import { getHolidayDeleteWatcher } from './holiday/holidayDelete';
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
    getExpenseAddUpdateWatcher(),
    getExpenseListWatcher(),
    getExpenseDeleteWatcher(),
    getExpenseByIdWatcher(),
    getExpenseReasonWatcher(),
    getPayslipListWatcher(),
    getAttendanceListWatcher(),
    getSupportAddWatcher(),
    getSupportListWatcher(),
    getSupportUpdateWatcher(),
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
    getLeaveByIdWatcher()
  ]);
}
