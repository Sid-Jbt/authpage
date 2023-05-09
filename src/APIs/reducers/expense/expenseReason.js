import { GET_EXPENSE_REASON_SUCCESS } from '../../constants';

const initialState = {};

export default function expenseReasonReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_REASON_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
