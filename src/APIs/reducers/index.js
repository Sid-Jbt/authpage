import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import loginReducer from './loginReducer';
import customizationReducer from './customizationReducer';
// import forgotPasswordReducer from './forgotPasswordReducer';
// import resetPasswordReducer from './resetPasswordReducer';
import profileUpdateReducer from './profileUpdateReducer';
import dashboardReducer from './dashboardReducer';
import organisationProfileUpdateReducer from './organisationProfileUpdateReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  loader: loaderReducer,
  login: loginReducer,
  // forgotPassword: forgotPasswordReducer,
  // resetPassword: resetPasswordReducer,
  profileUpdate: profileUpdateReducer,
  organistaionProfileUpdate: organisationProfileUpdateReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
