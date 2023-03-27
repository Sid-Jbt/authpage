import { GET_HOLIDAY_ADD_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function holidayAddUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOLIDAY_ADD_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
