import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import loginReducer from './loginReducer';
import customizationReducer from './customizationReducer';
// import forgotPasswordReducer from './forgotPasswordReducer';
// import resetPasswordReducer from './resetPasswordReducer';
// import profileUpdateReducer from './profileUpdateReducer';
import dashboardReducer from './dashboardReducer';
import employeeBySlugReducer from './employee/employeeBySlug';
// import expenseAddUpdateReducer from './expense/expenseAddUpdate';
// import expenseListReducer from './expense/expenseList';
// import expenseDeleteReducer from './expense/expenseDelete';
// import expenseByIdReducer from "./expense/expenseById";
// import expenseReasonReducer from "./expense/expenseReason";
// import employeeBySlugReducer from './employee/employeeBySlug';
// import domainReducer from './getDomain';
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
  // employeeList: employeeListReducer,
  employeeBySlug: employeeBySlugReducer,
  dashboard: dashboardReducer
  // expenseList: expenseListReducer,
  // expenseAddUpdate: expenseAddUpdateReducer,
  // expenseDelete: expenseDeleteReducer,
  // expenseById: expenseByIdReducer,
  // expenseReason: expenseReasonReducer,
  // employeeList: employeeListReducer
  // employeeBySlug: employeeBySlugReducer,
  // domain: domainReducer
});

const appReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default appReducer;
