import { GET_SUPPORT_ADD_UPDATE_SUCCESS } from '../../constants';

const initialState = {};

export default function supportAddUpdateReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUPPORT_ADD_UPDATE_SUCCESS:
      return {
        ...state
      };
    default:
      return state;
  }
}
