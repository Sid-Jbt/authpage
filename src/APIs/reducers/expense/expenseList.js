import { GET_EXPENSE_LIST_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function expenseListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSE_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
