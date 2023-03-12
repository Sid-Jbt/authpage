import { all } from 'redux-saga/effects';
import { getDashboardWatcher } from './dashboard';
import { getForgotPasswordWatcher } from './forgotPassword';
import { getLoginWatcher } from './login';
import { getOrganisationSignupWatcher } from './organisationSignup';
import { getOrganisationProfileUpdateWatcher } from './organistaionProfileUpdate';
import { getProfileUpdateWatcher } from './profileUpdate';
import { getResetPasswordWatcher } from './resetPassword';

export default function* rootSaga() {
  yield all([
    getLoginWatcher(),
    getOrganisationSignupWatcher(),
    getForgotPasswordWatcher(),
    getResetPasswordWatcher(),
    getProfileUpdateWatcher(),
    getDashboardWatcher(),
    getOrganisationProfileUpdateWatcher()
  ]);
}
