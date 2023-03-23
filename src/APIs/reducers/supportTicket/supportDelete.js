import { GET_SUPPORT_DELETE_SUCCESS } from '../../constants';

const initialState = {};

export default function supportDeleteReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPORT_DELETE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
