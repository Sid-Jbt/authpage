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
import { getDomainWatcher } from './getDomain';
import { getExpenseAddWatcher } from './expense/expenseAdd';
import { getExpenseListWatcher } from './expense/expenseList';
import { getExpenseUpdateWatcher } from './expense/expenseUpdate';
import { getExpenseDeleteWatcher } from './expense/expenseDelete';
import { getExpenseByIdWatcher } from './expense/expenseByID';
import { getExpenseReasonWatcher } from './expense/expenseReason';

export default function* rootSaga() {
  yield all([
    getLoginWatcher(),
    getOrganisationSignupWatcher(),
    getDomainWatcher(),
    getForgotPasswordWatcher(),
    getResetPasswordWatcher(),
    getProfileUpdateWatcher(),
    getDashboardWatcher(),
    getEmployeeAddWatcher(),
    getEmployeeListWatcher(),
    getEmployeeBySlugWatcher(),
    getExpenseAddWatcher(),
    getExpenseListWatcher(),
    getExpenseUpdateWatcher(),
    getExpenseDeleteWatcher(),
    getExpenseByIdWatcher(),
    getExpenseReasonWatcher()
  ]);
}
