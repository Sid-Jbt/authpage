import { combineReducers } from 'redux';
import loaderReducer from './loaderReducer';
import loginReducer from './loginReducer';
import customizationReducer from './customizationReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  loader: loaderReducer,
  login: loginReducer,
  dashboard: dashboardReducer
});

const appReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

export default appReducer;
