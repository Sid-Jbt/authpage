import { GET_EMPLOYEE_DELETE_SUCCESS } from '../../constants';

const initialState = {};

export default function employeeDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_DELETE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
