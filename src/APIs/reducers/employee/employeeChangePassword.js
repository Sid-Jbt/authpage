import { GET_EMPLOYEE_CHANGE_PASSWORD_SUCCESS } from '../../constants';

const initialState = {};

export default function employeeChangePasswordReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
