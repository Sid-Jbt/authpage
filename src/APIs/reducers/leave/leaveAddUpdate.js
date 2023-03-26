import { GET_LEAVE_ADD_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function leaveAddUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAVE_ADD_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
