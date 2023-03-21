import { GET_LEAVE_ADD_SUCCESS } from '../../constants';

const initialState = {};

export default function leaveAddReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAVE_ADD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
