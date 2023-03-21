import { GET_EXPENSE_ADD_SUCCESS } from '../../constants';

const initialState = {};
export default function expenseAddReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_ADD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
