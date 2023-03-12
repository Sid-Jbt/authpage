import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import loginReducer from './loginReducer';
import customizationReducer from './customizationReducer';
// import forgotPasswordReducer from './forgotPasswordReducer';
// import resetPasswordReducer from './resetPasswordReducer';
import profileUpdateReducer from './profileUpdateReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  loader: loaderReducer,
  login: loginReducer,
  // forgotPassword: forgotPasswordReducer,
  // resetPassword: resetPasswordReducer,
  profileUpdate: profileUpdateReducer,
  dashboard: dashboardReducer
});

export default rootReducer;
