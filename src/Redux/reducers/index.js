import { combineReducers } from 'redux';
import customizationReducer from './ui/customizationReducer';

const rootReducer = combineReducers({
  customization: customizationReducer
});

export default rootReducer;
