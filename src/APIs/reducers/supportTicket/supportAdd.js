import { GET_SUPPORT_ADD_SUCCESS } from '../../constants';

const initialState = {};

export default function supportAddReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPORT_ADD_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
