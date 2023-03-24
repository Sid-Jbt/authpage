import { GET_HOLIDAY_LIST_SUCCESS } from '../../constants';

const initialState = {
  list: ''
};

export default function holidayListReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOLIDAY_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload.rows,
        count: action.payload.count
      };
    default:
      return state;
  }
}
