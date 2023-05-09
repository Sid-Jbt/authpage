import { GET_EMPLOYEE_DISABLE_SUCCESS } from '../../constants';

const initialState = {};

export default function employeeDisableReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_DISABLE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
