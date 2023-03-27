import { GET_EXPENSE_ID_DATA_SUCCESS } from '../../constants';

const initialState = {};

export default function expenseByIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_ID_DATA_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
