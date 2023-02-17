import { combineReducers } from 'redux';
import routeReducer from './routes/routeReducer';
import customizationReducer from './ui/customizationReducer';

const rootReducer = combineReducers({
  customization: customizationReducer,
  route: routeReducer
});

export default rootReducer;
