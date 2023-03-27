import { GET_EXPENSE_ADD_UPDATE_SUCCESS } from '../../constants';

const initialState = {};
export default function expenseAddUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_ADD_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
