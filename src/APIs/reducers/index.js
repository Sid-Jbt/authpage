import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import loginReducer from './loginReducer';
import customizationReducer from './customizationReducer';
// import forgotPasswordReducer from './forgotPasswordReducer';
// import resetPasswordReducer from './resetPasswordReducer';
// import profileUpdateReducer from './profileUpdateReducer';
import dashboardReducer from './dashboardReducer';
import employeeBySlugReducer from './employee/employeeBySlug';
// import employeeListReducer from './employee/employeeList';
// import employeeAddReducer from './employee/employeeAdd';
import expenseAddReducer from './expense/expenseAdd';
import expenseListReducer from './expense/expenseList';

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
  expenseAdd: expenseAddReducer,
  expenseList: expenseListReducer
});

export default rootReducer;
