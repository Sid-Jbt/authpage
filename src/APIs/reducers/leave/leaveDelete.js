import { GET_LEAVE_DELETE_SUCCESS } from '../../constants';

const initialState = {};

export default function leaveDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAVE_DELETE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
