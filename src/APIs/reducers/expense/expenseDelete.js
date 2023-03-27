import { GET_EXPENSE_DELETE_SUCCESS } from '../../constants';

const initialState = {};

export default function expenseDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_DELETE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
