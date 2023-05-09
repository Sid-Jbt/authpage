import { GET_EMPLOYEE_ADD_SUCCESS } from '../../constants';

const initialState = {};

export default function employeeAddReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_ADD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
