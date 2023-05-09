import { GET_EMPLOYEE_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function employeeUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
