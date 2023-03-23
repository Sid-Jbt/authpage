import { GET_EXPENSE_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function expenseUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
