import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import loginReducer from './loginReducer';
import customizationReducer from './customizationReducer';
// import forgotPasswordReducer from './forgotPasswordReducer';
// import resetPasswordReducer from './resetPasswordReducer';
// import profileUpdateReducer from './profileUpdateReducer';
import dashboardReducer from './dashboardReducer';
import employeeBySlugReducer from './employee/employeeBySlug';
import leaveAddUpdateReducer from './leave/leaveAddUpdate';
import leaveListReducer from './leave/leaveList';
import leaveDeleteReducer from './leave/leaveDelete';
// import employeeListReducer from './employee/employeeList';
// import employeeAddReducer from './employee/employeeAdd';

const rootReducer = combineReducers({
  customization: customizationReducer,
  loader: loaderReducer,
  login: loginReducer,
  // forgotPassword: forgotPasswordReducer,
  // resetPassword: resetPasswordReducer,
  // profileUpdate: profileUpdateReducer,
  // employeeAdd: employeeAddReducer,
  dashboard: dashboardReducer,
  // employeeList: employeeListReducer
  employeeBySlug: employeeBySlugReducer,
  leaveAddUpdate: leaveAddUpdateReducer,
  leaveList: leaveListReducer,
  leaveDelete: leaveDeleteReducer
});

export default rootReducer;
