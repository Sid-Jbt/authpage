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
import { getSupportAddWatcher } from './supportTicket/supportAdd';
import { getSupportListWatcher } from './supportTicket/supportList';
import { getSupportUpdateWatcher } from './supportTicket/supportUpdate';
import { getSupportByIdWatcher } from './supportTicket/supportById';
import { getSupportDeleteWatcher } from './supportTicket/supportDelete';

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
    getSupportAddWatcher(),
    getSupportListWatcher(),
    getSupportUpdateWatcher(),
    getSupportByIdWatcher(),
    getSupportDeleteWatcher()
  ]);
}
