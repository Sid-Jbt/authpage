import { GET_SUPPORT_REASON_SUCCESS } from '../../constants';

const initialState = {};

export default function supportReasonReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPORT_REASON_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
