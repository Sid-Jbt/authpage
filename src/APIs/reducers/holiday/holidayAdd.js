import { GET_HOLIDAY_ADD_SUCCESS } from '../../constants';

const initialState = {};

export default function holidayAddReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOLIDAY_ADD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
