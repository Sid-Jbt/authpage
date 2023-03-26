import { GET_LEAVE_REASON_SUCCESS } from '../../constants';

const initialState = {};

export default function leaveReasonReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAVE_REASON_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
