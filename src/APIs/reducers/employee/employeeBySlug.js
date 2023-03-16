import { GET_EMPLOYEE_BY_SLUG_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function employeeBySlugReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEE_BY_SLUG_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
