import { GET_HOLIDAY_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function supportUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOLIDAY_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
