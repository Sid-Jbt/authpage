import { GET_HOLIDAY_DELETE_SUCCESS } from '../../constants';

const initialState = {};

export default function holidayDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOLIDAY_DELETE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
