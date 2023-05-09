import { GET_LEAVE_ID_DATA_SUCCESS } from '../../constants';

const initialState = {};

export default function leaveByIdReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LEAVE_ID_DATA_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
